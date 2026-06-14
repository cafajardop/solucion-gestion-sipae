using System.Text.RegularExpressions;
using Microsoft.Data.SqlClient;

namespace GestionPae.Api.Data;

// Crea la base de datos, las tablas, el procedimiento y los datos de ejemplo
// la primera vez que arranca la API. Asi el usuario solo levanta Docker y ejecuta.
public static class DbInitializer
{
    public static async Task InitializeAsync(IConfiguration configuration, ILogger logger)
    {
        var connectionString = configuration.GetConnectionString("Sipae")!;
        var builder = new SqlConnectionStringBuilder(connectionString);
        var dbName = builder.InitialCatalog;
        var esAzureSql = builder.DataSource.Contains("database.windows.net", StringComparison.OrdinalIgnoreCase);

        // En SQL Server local se crea la base; en Azure SQL ya existe (se crea en el portal)
        if (!esAzureSql)
        {
            var masterBuilder = new SqlConnectionStringBuilder(connectionString) { InitialCatalog = "master" };
            await using var master = new SqlConnection(masterBuilder.ConnectionString);
            await WaitForServerAsync(master, logger);
            await using var createDb = master.CreateCommand();
            createDb.CommandText = $"IF DB_ID('{dbName}') IS NULL CREATE DATABASE [{dbName}];";
            await createDb.ExecuteNonQueryAsync();
        }

        // Si la tabla ya existe, no hacemos nada (BD ya inicializada)
        await using var conn = new SqlConnection(connectionString);
        await WaitForServerAsync(conn, logger);
        await using (var check = conn.CreateCommand())
        {
            check.CommandText = "SELECT OBJECT_ID('dbo.Institucion');";
            var result = await check.ExecuteScalarAsync();
            if (result is not null && result != DBNull.Value)
            {
                logger.LogInformation("La base de datos ya estaba inicializada.");
                return;
            }
        }

        // Ejecutar los scripts (cada lote separado por GO)
        var scriptDir = Path.Combine(AppContext.BaseDirectory, "database");
        foreach (var fileName in new[] { "01-schema.sql", "02-procedures.sql", "03-seed.sql" })
        {
            var path = Path.Combine(scriptDir, fileName);
            var script = await File.ReadAllTextAsync(path);
            foreach (var batch in SplitOnGo(script))
            {
                if (string.IsNullOrWhiteSpace(batch)) continue;
                await using var cmd = conn.CreateCommand();
                cmd.CommandText = batch;
                await cmd.ExecuteNonQueryAsync();
            }
            logger.LogInformation("Ejecutado: {File}", fileName);
        }

        logger.LogInformation("Base de datos inicializada correctamente.");
    }

    private static IEnumerable<string> SplitOnGo(string script) =>
        Regex.Split(script, @"^\s*GO\s*$", RegexOptions.Multiline | RegexOptions.IgnoreCase);

    private static async Task WaitForServerAsync(SqlConnection conn, ILogger logger)
    {
        for (var attempt = 1; attempt <= 30; attempt++)
        {
            try
            {
                await conn.OpenAsync();
                return;
            }
            catch (SqlException)
            {
                logger.LogInformation("Esperando a la base de datos... intento {Attempt}/30", attempt);
                await Task.Delay(2000);
            }
        }
        throw new InvalidOperationException(
            "No se pudo conectar a la base de datos. Verifica la cadena de conexion y el firewall.");
    }
}

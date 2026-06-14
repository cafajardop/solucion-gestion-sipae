using Microsoft.Data.SqlClient;

namespace GestionPae.Api.Data;

// Fabrica de conexiones: centraliza la cadena de conexion (que llega por configuracion)
public class DbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("Sipae")
            ?? throw new InvalidOperationException("Falta la cadena de conexion 'Sipae'.");
    }

    public SqlConnection Create() => new SqlConnection(_connectionString);
}

using Dapper;
using GestionPae.Api.Data;
using GestionPae.Api.Dtos;
using GestionPae.Api.Models;

namespace GestionPae.Api.Repositories;

public class InstitucionRepository : IInstitucionRepository
{
    private readonly DbConnectionFactory _factory;

    public InstitucionRepository(DbConnectionFactory factory) => _factory = factory;

    public async Task<(IReadOnlyList<Institucion> Items, int Total)> ListarAsync(
        string? municipio, int pagina, int tamano)
    {
        var offset = (pagina - 1) * tamano;

        // Todo parametrizado: sin concatenacion de texto -> sin inyeccion SQL.
        const string filtro = "WHERE (@municipio IS NULL OR Municipio LIKE '%' + @municipio + '%')";
        var sql = $@"
            SELECT COUNT(*) FROM Institucion {filtro};

            SELECT Id, Codigo, Nombre, Municipio, Activa
            FROM Institucion
            {filtro}
            ORDER BY Nombre
            OFFSET @offset ROWS FETCH NEXT @tamano ROWS ONLY;";

        using var conn = _factory.Create();
        using var multi = await conn.QueryMultipleAsync(sql, new { municipio, offset, tamano });

        var total = await multi.ReadFirstAsync<int>();
        var items = (await multi.ReadAsync<Institucion>()).ToList();
        return (items, total);
    }

    public async Task<Institucion?> ObtenerPorIdAsync(int id)
    {
        const string sql = @"SELECT Id, Codigo, Nombre, Municipio, Activa
                             FROM Institucion WHERE Id = @id;";
        using var conn = _factory.Create();
        return await conn.QuerySingleOrDefaultAsync<Institucion>(sql, new { id });
    }

    public async Task<int> CrearAsync(InstitucionCreateDto dto)
    {
        const string sql = @"INSERT INTO Institucion (Codigo, Nombre, Municipio, Activa)
                             OUTPUT INSERTED.Id
                             VALUES (@Codigo, @Nombre, @Municipio, @Activa);";
        using var conn = _factory.Create();
        return await conn.ExecuteScalarAsync<int>(sql,
            new { dto.Codigo, dto.Nombre, dto.Municipio, dto.Activa });
    }
}

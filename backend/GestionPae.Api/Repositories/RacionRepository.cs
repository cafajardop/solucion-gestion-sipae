using System.Data;
using Dapper;
using GestionPae.Api.Data;
using GestionPae.Api.Dtos;

namespace GestionPae.Api.Repositories;

public class RacionRepository : IRacionRepository
{
    private readonly DbConnectionFactory _factory;

    public RacionRepository(DbConnectionFactory factory) => _factory = factory;

    // Usa el procedimiento almacenado sp_RegistrarRacion (valida institucion activa).
    // Si la validacion falla, el proc lanza THROW -> SqlException que maneja el controlador.
    public async Task RegistrarAsync(RacionCreateDto dto)
    {
        using var conn = _factory.Create();
        await conn.ExecuteAsync(
            "sp_RegistrarRacion",
            new
            {
                dto.InstitucionId,
                dto.Fecha,
                dto.TipoRacion,
                dto.Cantidad
            },
            commandType: CommandType.StoredProcedure);
    }
}

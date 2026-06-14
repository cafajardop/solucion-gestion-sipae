using GestionPae.Api.Dtos;

namespace GestionPae.Api.Services;

public interface IInstitucionService
{
    Task<PagedResult<InstitucionDto>> ListarAsync(string? municipio, int pagina, int tamano);
    Task<InstitucionDto?> ObtenerPorIdAsync(int id);
    Task<InstitucionDto> CrearAsync(InstitucionCreateDto dto);
}

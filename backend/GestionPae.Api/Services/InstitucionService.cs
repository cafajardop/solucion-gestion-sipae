using GestionPae.Api.Dtos;
using GestionPae.Api.Models;
using GestionPae.Api.Repositories;

namespace GestionPae.Api.Services;

// Capa de negocio: orquesta el repositorio y mapea entidad <-> DTO.
public class InstitucionService : IInstitucionService
{
    private readonly IInstitucionRepository _repo;

    public InstitucionService(IInstitucionRepository repo) => _repo = repo;

    public async Task<PagedResult<InstitucionDto>> ListarAsync(string? municipio, int pagina, int tamano)
    {
        var (items, total) = await _repo.ListarAsync(municipio, pagina, tamano);
        return new PagedResult<InstitucionDto>
        {
            Items = items.Select(Map).ToList(),
            Total = total,
            Pagina = pagina,
            Tamano = tamano
        };
    }

    public async Task<InstitucionDto?> ObtenerPorIdAsync(int id)
    {
        var entidad = await _repo.ObtenerPorIdAsync(id);
        return entidad is null ? null : Map(entidad);
    }

    public async Task<InstitucionDto> CrearAsync(InstitucionCreateDto dto)
    {
        var id = await _repo.CrearAsync(dto);
        return new InstitucionDto
        {
            Id = id,
            Codigo = dto.Codigo,
            Nombre = dto.Nombre,
            Municipio = dto.Municipio,
            Activa = dto.Activa
        };
    }

    private static InstitucionDto Map(Institucion e) => new()
    {
        Id = e.Id,
        Codigo = e.Codigo,
        Nombre = e.Nombre,
        Municipio = e.Municipio,
        Activa = e.Activa
    };
}

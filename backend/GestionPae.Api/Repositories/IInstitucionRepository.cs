using GestionPae.Api.Dtos;
using GestionPae.Api.Models;

namespace GestionPae.Api.Repositories;

public interface IInstitucionRepository
{
    Task<(IReadOnlyList<Institucion> Items, int Total)> ListarAsync(string? municipio, int pagina, int tamano);
    Task<Institucion?> ObtenerPorIdAsync(int id);
    Task<int> CrearAsync(InstitucionCreateDto dto);
}

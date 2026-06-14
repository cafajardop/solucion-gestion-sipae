using GestionPae.Api.Dtos;

namespace GestionPae.Api.Services;

public interface IRacionService
{
    Task RegistrarAsync(RacionCreateDto dto);
}

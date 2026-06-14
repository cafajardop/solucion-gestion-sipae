using GestionPae.Api.Dtos;

namespace GestionPae.Api.Repositories;

public interface IRacionRepository
{
    Task RegistrarAsync(RacionCreateDto dto);
}

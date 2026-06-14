using GestionPae.Api.Dtos;
using GestionPae.Api.Repositories;

namespace GestionPae.Api.Services;

public class RacionService : IRacionService
{
    private readonly IRacionRepository _repo;

    public RacionService(IRacionRepository repo) => _repo = repo;

    public Task RegistrarAsync(RacionCreateDto dto) => _repo.RegistrarAsync(dto);
}

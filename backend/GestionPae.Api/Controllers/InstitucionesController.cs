using GestionPae.Api.Dtos;
using GestionPae.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GestionPae.Api.Controllers;

[ApiController]
[Route("api/instituciones")]
public class InstitucionesController : ControllerBase
{
    private readonly IInstitucionService _service;

    public InstitucionesController(IInstitucionService service) => _service = service;

    // GET /api/instituciones?municipio=&pagina=&tamano=
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<InstitucionDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<InstitucionDto>>> Get(
        [FromQuery] string? municipio,
        [FromQuery] int pagina = 1,
        [FromQuery] int tamano = 20)
    {
        if (pagina < 1) pagina = 1;
        if (tamano < 1 || tamano > 100) tamano = 20;

        var resultado = await _service.ListarAsync(municipio, pagina, tamano);
        return Ok(resultado);
    }

    // GET /api/instituciones/{id}
    [HttpGet("{id:int}", Name = "ObtenerInstitucion")]
    [ProducesResponseType(typeof(InstitucionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<InstitucionDto>> GetById(int id)
    {
        var dto = await _service.ObtenerPorIdAsync(id);
        return dto is null ? NotFound() : Ok(dto);
    }

    // POST /api/instituciones
    [HttpPost]
    [ProducesResponseType(typeof(InstitucionDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<InstitucionDto>> Crear([FromBody] InstitucionCreateDto dto)
    {
        // [ApiController] valida el modelo automaticamente; se deja explicito por claridad.
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var creada = await _service.CrearAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = creada.Id }, creada);
    }
}

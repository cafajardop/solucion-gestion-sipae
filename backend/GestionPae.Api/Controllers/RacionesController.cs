using GestionPae.Api.Dtos;
using GestionPae.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace GestionPae.Api.Controllers;

[ApiController]
[Route("api/raciones")]
public class RacionesController : ControllerBase
{
    private readonly IRacionService _service;

    public RacionesController(IRacionService service) => _service = service;

    // POST /api/raciones  -> registra una entrega validando institucion activa
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Crear([FromBody] RacionCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _service.RegistrarAsync(dto);
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (SqlException ex) when (ex.Number is 50000 or 50001)
        {
            // Errores controlados que lanza el procedimiento almacenado (THROW)
            return BadRequest(new { mensaje = ex.Message });
        }
    }
}

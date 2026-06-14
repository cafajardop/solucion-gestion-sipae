using System.ComponentModel.DataAnnotations;

namespace GestionPae.Api.Dtos;

public class RacionCreateDto
{
    [Required]
    public int InstitucionId { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    [Required]
    [StringLength(30)]
    public string TipoRacion { get; set; } = default!;

    [Range(0, int.MaxValue, ErrorMessage = "La cantidad no puede ser negativa.")]
    public int Cantidad { get; set; }
}

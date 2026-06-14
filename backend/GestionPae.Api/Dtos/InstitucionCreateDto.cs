using System.ComponentModel.DataAnnotations;

namespace GestionPae.Api.Dtos;

public class InstitucionCreateDto
{
    [Required(ErrorMessage = "El codigo es obligatorio.")]
    [StringLength(20, MinimumLength = 1, ErrorMessage = "El codigo admite maximo 20 caracteres.")]
    public string Codigo { get; set; } = default!;

    [Required(ErrorMessage = "El nombre es obligatorio.")]
    [StringLength(200, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 200 caracteres.")]
    public string Nombre { get; set; } = default!;

    [Required(ErrorMessage = "El municipio es obligatorio.")]
    [StringLength(100)]
    public string Municipio { get; set; } = default!;

    public bool Activa { get; set; } = true;
}

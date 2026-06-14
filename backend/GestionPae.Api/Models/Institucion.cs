namespace GestionPae.Api.Models;

public class Institucion
{
    public int Id { get; set; }
    public string Codigo { get; set; } = default!;
    public string Nombre { get; set; } = default!;
    public string Municipio { get; set; } = default!;
    public bool Activa { get; set; }
}

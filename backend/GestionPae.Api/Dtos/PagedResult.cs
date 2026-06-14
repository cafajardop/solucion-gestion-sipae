namespace GestionPae.Api.Dtos;

public class PagedResult<T>
{
    public IReadOnlyList<T> Items { get; set; } = new List<T>();
    public int Total { get; set; }
    public int Pagina { get; set; }
    public int Tamano { get; set; }
}

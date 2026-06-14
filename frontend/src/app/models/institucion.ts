export interface Institucion {
  id: number;
  codigo: string;
  nombre: string;
  municipio: string;
  activa: boolean;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  pagina: number;
  tamano: number;
}

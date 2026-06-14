import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institucion, PagedResult } from '../models/institucion';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InstitucionService {
  private readonly baseUrl = `${environment.apiUrl}/instituciones`;

  constructor(private http: HttpClient) {}

  listar(municipio: string, pagina: number, tamano: number): Observable<PagedResult<Institucion>> {
    let params = new HttpParams()
      .set('pagina', pagina)
      .set('tamano', tamano);

    if (municipio && municipio.trim()) {
      params = params.set('municipio', municipio.trim());
    }

    return this.http.get<PagedResult<Institucion>>(this.baseUrl, { params });
  }

  obtener(id: number): Observable<Institucion> {
    return this.http.get<Institucion>(`${this.baseUrl}/${id}`);
  }

  crear(dto: Omit<Institucion, 'id'>): Observable<Institucion> {
    return this.http.post<Institucion>(this.baseUrl, dto);
  }
}

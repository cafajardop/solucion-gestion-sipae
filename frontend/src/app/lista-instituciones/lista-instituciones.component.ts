import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, startWith,
  switchMap, tap, catchError, takeUntil
} from 'rxjs/operators';
import { InstitucionService } from '../services/institucion.service';
import { Institucion, PagedResult } from '../models/institucion';

@Component({
  selector: 'app-lista-instituciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card">
      <div class="field">
        <label for="busqueda">Buscar por municipio</label>
        <input id="busqueda" type="text" [formControl]="busquedaCtrl"
               placeholder="Ej: Medellín, Bello..." />
      </div>

      <p *ngIf="cargando" class="estado">Cargando...</p>
      <p *ngIf="error" class="estado error">{{ error }}</p>

      <table *ngIf="!cargando && !error">
        <thead>
          <tr>
            <th>Código</th><th>Nombre</th><th>Municipio</th><th>Activa</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let i of instituciones">
            <td>{{ i.codigo }}</td>
            <td>{{ i.nombre }}</td>
            <td>{{ i.municipio }}</td>
            <td>
              <span class="badge" [class.si]="i.activa" [class.no]="!i.activa">
                {{ i.activa ? 'Sí' : 'No' }}
              </span>
            </td>
          </tr>
          <tr *ngIf="instituciones.length === 0">
            <td colspan="4">No se encontraron instituciones.</td>
          </tr>
        </tbody>
      </table>

      <div class="paginacion" *ngIf="!cargando && !error && total > 0">
        <button (click)="cambiarPagina(-1)" [disabled]="pagina <= 1">Anterior</button>
        <span>Página {{ pagina }} de {{ totalPaginas }} &middot; {{ total }} registros</span>
        <button (click)="cambiarPagina(1)" [disabled]="pagina >= totalPaginas">Siguiente</button>
      </div>
    </div>
  `
})
export class ListaInstitucionesComponent implements OnInit, OnDestroy {
  instituciones: Institucion[] = [];
  total = 0;
  pagina = 1;
  tamano = 5;

  cargando = false;
  error: string | null = null;

  busquedaCtrl = new FormControl('', { nonNullable: true });

  private destroy$ = new Subject<void>();
  private load$ = new Subject<void>();

  constructor(private service: InstitucionService) {}

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.total / this.tamano));
  }

  ngOnInit(): void {
    // La búsqueda con debounce de 300 ms resetea a la primera página
    this.busquedaCtrl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.pagina = 1;
        this.load$.next();
      });

    // Stream único de carga: switchMap cancela la petición previa pendiente
    this.load$
      .pipe(
        startWith(void 0),
        tap(() => { this.cargando = true; this.error = null; }),
        switchMap(() =>
          this.service.listar(this.busquedaCtrl.value, this.pagina, this.tamano).pipe(
            catchError(() => {
              this.error = 'Ocurrió un error al cargar las instituciones. ¿Está corriendo la API?';
              return of<PagedResult<Institucion>>({
                items: [], total: 0, pagina: this.pagina, tamano: this.tamano
              });
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.instituciones = res.items;
        this.total = res.total;
        this.cargando = false;
      });
  }

  cambiarPagina(delta: number): void {
    const nueva = this.pagina + delta;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.pagina = nueva;
      this.load$.next();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

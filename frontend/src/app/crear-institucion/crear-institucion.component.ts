import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstitucionService } from '../services/institucion.service';

@Component({
  selector: 'app-crear-institucion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Nueva institución</h2>

      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div class="field">
          <label for="codigo">Código *</label>
          <input id="codigo" type="text" formControlName="codigo" />
          <div class="hint" *ngIf="invalido('codigo')">
            Requerido (máximo 20 caracteres).
          </div>
        </div>

        <div class="field">
          <label for="nombre">Nombre *</label>
          <input id="nombre" type="text" formControlName="nombre" />
          <div class="hint" *ngIf="invalido('nombre')">
            Requerido (entre 3 y 200 caracteres).
          </div>
        </div>

        <div class="field">
          <label for="municipio">Municipio *</label>
          <input id="municipio" type="text" formControlName="municipio" />
          <div class="hint" *ngIf="invalido('municipio')">
            Requerido (máximo 100 caracteres).
          </div>
        </div>

        <div class="field">
          <label>
            <input type="checkbox" formControlName="activa" /> Activa
          </label>
        </div>

        <button type="submit" [disabled]="form.invalid || enviando">
          {{ enviando ? 'Guardando...' : 'Guardar' }}
        </button>

        <p class="estado ok" *ngIf="mensajeOk">{{ mensajeOk }}</p>
        <p class="estado error" *ngIf="mensajeError">{{ mensajeError }}</p>
      </form>
    </div>
  `
})
export class CrearInstitucionComponent {
  enviando = false;
  mensajeOk = '';
  mensajeError = '';

  form = this.fb.nonNullable.group({
    codigo:    ['', [Validators.required, Validators.maxLength(20)]],
    nombre:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    municipio: ['', [Validators.required, Validators.maxLength(100)]],
    activa:    [true]
  });

  constructor(private fb: FormBuilder, private service: InstitucionService) {}

  invalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.enviando = true;
    this.mensajeOk = '';
    this.mensajeError = '';

    this.service.crear(this.form.getRawValue()).subscribe({
      next: (creada) => {
        this.enviando = false;
        this.mensajeOk = `Institución "${creada.nombre}" creada con éxito (Id ${creada.id}).`;
        this.form.reset({ activa: true });
      },
      error: () => {
        this.enviando = false;
        this.mensajeError = 'No se pudo crear. Revise los datos (el código no puede repetirse).';
      }
    });
  }
}

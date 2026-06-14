import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tecnologia { nombre: string; detalle: string; }
interface Categoria { titulo: string; items: Tecnologia[]; }

@Component({
  selector: 'app-tecnologias',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .intro { margin-bottom: 1.2rem; }
    .intro h2 { color: var(--azul); margin: 0 0 .3rem; }
    .intro p { color: var(--gris); margin: .15rem 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 1rem; }
    .cat h3 {
      color: var(--azul); margin: 0 0 .7rem;
      border-bottom: 2px solid var(--azul-claro); padding-bottom: .4rem;
    }
    .cat ul { list-style: none; margin: 0; padding: 0; display: grid; gap: .6rem; }
    .cat li { display: flex; flex-direction: column; }
    .nombre { font-weight: 600; color: #1f2933; }
    .detalle { font-size: .85rem; color: var(--gris); }
  `],
  template: `
    <div class="card intro">
      <h2>Tecnologías de la prueba</h2>
      <p>Stack y herramientas con las que se construyó esta solución full-stack
         del ecosistema SIPAE, de punta a punta.</p>
      <p>Angular (4200) ──HTTP──&gt; API .NET 8 ──Dapper──&gt; SQL Server / Azure SQL</p>
    </div>

    <div class="grid">
      <div class="cat card" *ngFor="let c of categorias">
        <h3>{{ c.titulo }}</h3>
        <ul>
          <li *ngFor="let t of c.items">
            <span class="nombre">{{ t.nombre }}</span>
            <span class="detalle">{{ t.detalle }}</span>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class TecnologiasComponent {
  categorias: Categoria[] = [
    {
      titulo: 'Frontend',
      items: [
        { nombre: 'Angular 17', detalle: 'SPA con componentes standalone (sin NgModules) y enrutamiento.' },
        { nombre: 'TypeScript', detalle: 'Tipado estático en servicios, modelos y componentes.' },
        { nombre: 'RxJS', detalle: 'Flujo reactivo: búsqueda con debounce, switchMap y takeUntil.' },
        { nombre: 'Reactive Forms', detalle: 'Formulario de creación con validaciones requeridas y de longitud.' },
        { nombre: 'HttpClient', detalle: 'Consumo tipado del API REST con HttpParams.' },
      ],
    },
    {
      titulo: 'Backend',
      items: [
        { nombre: '.NET 8 / C#', detalle: 'API REST sobre ASP.NET Core.' },
        { nombre: 'ASP.NET Core Web API', detalle: 'Controladores, validación de modelo y códigos HTTP correctos.' },
        { nombre: 'Dapper', detalle: 'Acceso a datos con consultas parametrizadas (sin inyección SQL).' },
        { nombre: 'Swagger / Swashbuckle', detalle: 'Documentación interactiva del API.' },
      ],
    },
    {
      titulo: 'Base de datos',
      items: [
        { nombre: 'SQL Server / Azure SQL', detalle: 'Motor relacional: local en Docker y en la nube (Azure SQL).' },
        { nombre: 'T-SQL', detalle: 'Esquema con PK, FK, CHECK, UNIQUE e índice covering.' },
        { nombre: 'Procedimiento almacenado', detalle: 'sp_RegistrarRacion con validación y error controlado (THROW).' },
      ],
    },
    {
      titulo: 'Arquitectura y buenas prácticas',
      items: [
        { nombre: 'Arquitectura por capas', detalle: 'Controller → Service → Repository.' },
        { nombre: 'Inyección de dependencias', detalle: 'Se depende de interfaces, no de implementaciones concretas.' },
        { nombre: 'DTOs', detalle: 'Contratos de la API separados de las entidades de base de datos.' },
        { nombre: 'API REST', detalle: 'Paginación, filtrado y códigos 200 / 201 / 400 / 404.' },
      ],
    },
    {
      titulo: 'Despliegue e infraestructura',
      items: [
        { nombre: 'Docker', detalle: 'Empaquetado del backend .NET para desplegarlo.' },
        { nombre: 'Render', detalle: 'Hosting del backend (Web Service) y del frontend (Static Site).' },
        { nombre: 'Azure SQL Database', detalle: 'Base de datos gestionada en la nube (capa gratuita).' },
        { nombre: 'GitHub', detalle: 'Control de versiones del repositorio.' },
        { nombre: 'Azure DevOps', detalle: 'Pipeline CI/CD definido en azure-pipelines.yml.' },
      ],
    },
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Opcion { k: string; t: string; }
interface PreguntaA {
  n: number; tema: string; pts: number;
  pregunta: string; opciones: Opcion[]; correcta: string; porque: string;
}
interface ItemB {
  sub: string; pts: number; enunciado: string;
  archivo?: string; codigo?: string; explicacion?: string;
}
interface EjercicioB { id: string; titulo: string; pts: number; items: ItemB[]; }

@Component({
  selector: 'app-solucion',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .intro { margin-bottom: 1rem; }
    .intro h2 { margin: 0 0 .4rem; color: var(--azul); }
    .intro p { color: var(--gris); margin: .2rem 0; }
    .seccion { margin-top: 1.5rem; }
    .seccion > h2 {
      color: var(--azul); border-bottom: 2px solid var(--azul-claro);
      padding-bottom: .4rem; margin-bottom: .25rem;
    }
    .seccion .pts { font-size: .8rem; color: var(--gris); font-weight: 400; }
    .q { margin: 1rem 0; }
    .q .tema {
      display: inline-block; background: var(--azul-claro); color: var(--azul);
      font-size: .72rem; font-weight: 600; padding: .12rem .5rem;
      border-radius: 20px; margin-bottom: .4rem;
    }
    .q .enunciado { font-weight: 600; margin: .2rem 0 .5rem; }
    .opciones { list-style: none; padding: 0; margin: 0; display: grid; gap: .35rem; }
    .opcion {
      border: 1px solid var(--borde); border-radius: 8px; padding: .45rem .7rem;
      font-size: .9rem; display: flex; gap: .5rem; align-items: baseline;
    }
    .opcion .letra { font-weight: 700; color: var(--gris); }
    .opcion.correcta { border-color: var(--verde); background: #eafaf1; }
    .opcion.correcta .letra { color: var(--verde); }
    .check { margin-left: auto; color: var(--verde); font-weight: 700; font-size: .8rem; white-space: nowrap; }
    .porque {
      margin-top: .5rem; font-size: .85rem; color: #2c3e50;
      background: #fbfbe8; border-left: 3px solid #d4c84a; padding: .4rem .7rem; border-radius: 4px;
    }
    .porque b { color: var(--azul); }
    .ejercicio { margin: 1.2rem 0; }
    .ejercicio > h3 { margin: .3rem 0; color: #1f2933; }
    .item { margin: .9rem 0 1.1rem; }
    .item .titulo-sub { font-weight: 600; }
    .item .enun { color: var(--gris); font-size: .9rem; margin: .25rem 0 .5rem; }
    .archivo {
      font-family: 'Roboto Mono', ui-monospace, Menlo, monospace; font-size: .76rem;
      color: var(--azul); background: var(--azul-claro); padding: .15rem .5rem;
      border-radius: 5px; display: inline-block; margin-bottom: .4rem;
    }
    pre.code {
      background: #1e2733; color: #e6edf3; border-radius: 8px;
      padding: .85rem 1rem; overflow-x: auto; font-size: .82rem; line-height: 1.45;
      font-family: 'Roboto Mono', ui-monospace, Menlo, Consolas, monospace; margin: .3rem 0;
    }
    .explica { font-size: .87rem; color: #2c3e50; margin-top: .4rem; }
    .explica b { color: var(--azul); }
    .acciones-pdf { display: flex; justify-content: flex-end; margin-bottom: .8rem; }
    .portada { text-align: center; }
    .titulo-prueba { color: #7b3f9e; font-size: 1.55rem; letter-spacing: .5px; margin: .2rem 0 1rem; }
    .subtitulo-prueba { color: #1f2933; font-size: 1.05rem; margin: 0 0 1.2rem; }
    .datos { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin: 1rem 0 1.4rem; font-size: .95rem; }
    .datos b { color: var(--gris); }
    .datos .valor { color: #7b3f9e; font-weight: 700; background: #f3ecf9; padding: .08rem .5rem; border-radius: 5px; }
    .instrucciones-titulo { color: #7b3f9e; text-align: left; margin: .6rem 0 .4rem; }
    .instrucciones { text-align: left; margin: 0; padding-left: 1.1rem; color: #2c3e50; font-size: .88rem; }
    .instrucciones li { margin: .3rem 0; }
    @media print {
      .acciones-pdf { display: none; }
      .card { box-shadow: none; border-color: #ccc; break-inside: avoid; }
      .q, .item { break-inside: avoid; }
      pre.code {
        background: #f4f6f8; color: #1e2733; border: 1px solid #d9dee5;
        white-space: pre-wrap; word-break: break-word; break-inside: avoid;
      }
    }
  `],
  template: `
    <div class="acciones-pdf">
      <button (click)="exportarPdf()">Exportar a PDF</button>
    </div>

    <div class="card portada">
      <h1 class="titulo-prueba">PRUEBA TÉCNICA DE SELECCIÓN</h1>
      <h2 class="subtitulo-prueba">DESARROLLADOR FULL STACK – ECOSISTEMA SIPAE</h2>
      <div class="datos">
        <span><b>Nombre:</b> <span class="valor">{{ nombre }}</span></span>
        <span><b>CC:</b> <span class="valor">{{ cedula }}</span></span>
      </div>
      <h3 class="instrucciones-titulo">Instrucciones</h3>
      <ul class="instrucciones">
        <li *ngFor="let ins of instrucciones">{{ ins }}</li>
      </ul>
    </div>

    <div class="card">
      <div class="intro">
        <h2>Solución de la prueba técnica</h2>
        <p>Desarrollador Full Stack — Ecosistema SIPAE. Respuestas resueltas y
           justificadas. La Parte B referencia el código real de este proyecto.</p>
        <p>Total: 100 puntos · Parte A (28) preguntas cerradas · Parte B (72) con código.</p>
      </div>

      <section class="seccion">
        <h2>Parte A — Preguntas cerradas <span class="pts">(28 pts)</span></h2>

        <div class="q" *ngFor="let q of parteA">
          <span class="tema">{{ q.tema }} · {{ q.pts }} pts</span>
          <div class="enunciado">{{ q.n }}. {{ q.pregunta }}</div>
          <ul class="opciones">
            <li class="opcion" *ngFor="let o of q.opciones"
                [class.correcta]="o.k === q.correcta">
              <span class="letra">{{ o.k }}.</span>
              <span>{{ o.t }}</span>
              <span class="check" *ngIf="o.k === q.correcta">✔ Correcta</span>
            </li>
          </ul>
          <div class="porque"><b>Por qué:</b> {{ q.porque }}</div>
        </div>
      </section>

      <section class="seccion">
        <h2>Parte B — Preguntas abiertas con código <span class="pts">(72 pts)</span></h2>

        <div class="ejercicio" *ngFor="let e of parteB">
          <h3>{{ e.id }}. {{ e.titulo }} <span class="pts">({{ e.pts }} pts)</span></h3>

          <div class="item" *ngFor="let it of e.items">
            <div class="titulo-sub">{{ it.sub }} <span class="pts">({{ it.pts }} pts)</span></div>
            <div class="enun">{{ it.enunciado }}</div>
            <span class="archivo" *ngIf="it.archivo">{{ it.archivo }}</span>
            <pre class="code" *ngIf="it.codigo">{{ it.codigo }}</pre>
            <div class="explica" *ngIf="it.explicacion"><b>Explicación:</b> {{ it.explicacion }}</div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class SolucionComponent {
  nombre = 'Carlos Andrés Fajardo Pedraza';
  cedula = '80199444';

  instrucciones = [
    'Diligencie nombre completo y cédula.',
    'Parte A: marque una única opción por pregunta. Las respuestas en borrador no serán tenidas en cuenta.',
    'Parte B: el código puede escribirse en el editor de su preferencia y debe entregarse en los espacios indicados. Se evalúa que el código compile/ejecute conceptualmente, las buenas prácticas y la claridad, no la memorización exacta de sintaxis.',
    'Stack de referencia: Angular 15+ (TypeScript), .NET 6+ (C#), SQL Server. Este proyecto se implementó con Angular 17, .NET 8 y SQL Server.',
  ];

  parteA: PreguntaA[] = [
    {
      n: 1, tema: 'Angular', pts: 2,
      pregunta: 'Forma correcta de consumir un servicio HTTP y suscribirse en un componente, evitando fugas de memoria.',
      opciones: [
        { k: 'A', t: 'Llamar a HttpClient en el constructor y guardar el resultado en una variable global.' },
        { k: 'B', t: 'Inyectar un servicio que use HttpClient, suscribirse en ngOnInit y cancelar en ngOnDestroy (o usar async / takeUntilDestroyed).' },
        { k: 'C', t: 'Usar document.fetch dentro del template con interpolación.' },
        { k: 'D', t: 'Suscribirse en el constructor y nunca cancelar, porque Angular lo hace solo.' },
      ],
      correcta: 'B',
      porque: 'La suscripción manual debe liberarse o queda viva tras destruir el componente. ngOnInit/ngOnDestroy, el pipe async o takeUntilDestroyed la cierran, como hace lista-instituciones con takeUntil.',
    },
    {
      n: 2, tema: '.NET / DI', pts: 2,
      pregunta: "El ciclo de vida 'Scoped' al registrar un servicio en ASP.NET Core significa que:",
      opciones: [
        { k: 'A', t: 'Se crea una única instancia para toda la vida de la aplicación.' },
        { k: 'B', t: 'Se crea una instancia nueva cada vez que se solicita el servicio.' },
        { k: 'C', t: 'Se crea una instancia por cada petición HTTP y se comparte dentro de esa petición.' },
        { k: 'D', t: 'El servicio solo puede usarse en controladores.' },
      ],
      correcta: 'C',
      porque: 'Singleton es una para toda la app; Transient una por cada resolución; Scoped una por request HTTP, compartida entre las clases que la resuelven en esa misma petición.',
    },
    {
      n: 3, tema: 'Angular', pts: 2,
      pregunta: 'Afirmación correcta sobre la comunicación entre componentes Angular.',
      opciones: [
        { k: 'A', t: '@Input() permite que un hijo emita eventos al padre.' },
        { k: 'B', t: '@Output() con EventEmitter permite que un hijo notifique eventos al padre.' },
        { k: 'C', t: 'Los servicios no pueden usarse para compartir estado.' },
        { k: 'D', t: 'Dos hermanos solo pueden comunicarse mediante localStorage.' },
      ],
      correcta: 'B',
      porque: '@Input() pasa datos del padre al hijo; @Output() con EventEmitter va del hijo al padre. Para estado compartido entre hermanos se usa un servicio.',
    },
    {
      n: 4, tema: 'SQL Server', pts: 2,
      pregunta: 'Opción que describe correctamente un índice no agrupado (nonclustered).',
      opciones: [
        { k: 'A', t: 'Reordena físicamente la tabla según la clave del índice.' },
        { k: 'B', t: 'Solo puede existir uno por tabla.' },
        { k: 'C', t: 'Es una estructura separada con punteros a las filas; pueden existir varios por tabla.' },
        { k: 'D', t: 'Es obligatorio para crear llaves foráneas.' },
      ],
      correcta: 'C',
      porque: 'El índice agrupado ordena físicamente la tabla y solo hay uno. El no agrupado es una estructura aparte con punteros; pueden crearse varios, como IX_Racion_Fecha_Institucion.',
    },
    {
      n: 5, tema: 'SQL', pts: 2,
      pregunta: 'Dadas Estudiante(Id, Nombre) y Entrega(Id, EstudianteId, Fecha), ¿qué consulta devuelve TODOS los estudiantes, incluidos los que no tienen entregas?',
      opciones: [
        { k: 'A', t: 'SELECT e.Nombre FROM Estudiante e INNER JOIN Entrega t ON t.EstudianteId = e.Id' },
        { k: 'B', t: 'SELECT e.Nombre FROM Estudiante e LEFT JOIN Entrega t ON t.EstudianteId = e.Id' },
        { k: 'C', t: 'SELECT e.Nombre FROM Entrega t LEFT JOIN Estudiante e ON t.EstudianteId = e.Id' },
        { k: 'D', t: 'SELECT e.Nombre FROM Estudiante e CROSS JOIN Entrega t' },
      ],
      correcta: 'B',
      porque: 'LEFT JOIN conserva todas las filas de la tabla izquierda (Estudiante) aunque no haya coincidencia en Entrega. INNER excluye a los que no tienen entregas; CROSS produce el producto cartesiano.',
    },
    {
      n: 6, tema: 'SQL / Seguridad', pts: 2,
      pregunta: 'Propósito principal de usar parámetros (consultas parametrizadas o procedimientos) en lugar de concatenar texto.',
      opciones: [
        { k: 'A', t: 'Mejorar el formato visual del código SQL.' },
        { k: 'B', t: 'Prevenir inyección SQL y favorecer la reutilización de planes de ejecución.' },
        { k: 'C', t: 'Permitir usar más de un JOIN por consulta.' },
        { k: 'D', t: 'Evitar el uso de índices.' },
      ],
      correcta: 'B',
      porque: 'Los parámetros separan código de datos: el motor no interpreta la entrada como SQL (evita inyección) y reutiliza el plan de ejecución. Es el enfoque de los repositorios con Dapper.',
    },
    {
      n: 7, tema: 'REST', pts: 2,
      pregunta: 'Un POST /api/beneficiarios con datos válidos crea el recurso. Respuesta HTTP más adecuada.',
      opciones: [
        { k: 'A', t: '200 OK sin cuerpo.' },
        { k: 'B', t: '201 Created con encabezado Location apuntando al nuevo recurso.' },
        { k: 'C', t: '204 No Content con el recurso en el cuerpo.' },
        { k: 'D', t: '302 Found redirigiendo al listado.' },
      ],
      correcta: 'B',
      porque: '201 Created indica que se creó un recurso e incluye Location con su URL. Es lo que devuelve CreatedAtAction en el POST de InstitucionesController.',
    },
    {
      n: 8, tema: 'REST', pts: 2,
      pregunta: 'Método HTTP que debe ser idempotente según las convenciones REST.',
      opciones: [
        { k: 'A', t: 'POST' },
        { k: 'B', t: 'PUT' },
        { k: 'C', t: 'Ninguno; la idempotencia no aplica en REST.' },
        { k: 'D', t: 'Todos los métodos son idempotentes por definición.' },
      ],
      correcta: 'B',
      porque: 'PUT, GET y DELETE son idempotentes: repetir la misma petición deja el mismo estado final. POST no lo es, cada llamada suele crear un recurso nuevo.',
    },
    {
      n: 9, tema: 'Scrum', pts: 2,
      pregunta: 'El refinamiento del backlog (backlog refinement) tiene como propósito principal:',
      opciones: [
        { k: 'A', t: 'Asignar culpables por los retrasos del sprint anterior.' },
        { k: 'B', t: 'Detallar, estimar y ordenar los ítems del Product Backlog para que estén listos para futuros sprints.' },
        { k: 'C', t: 'Aprobar el paso a producción de los desarrollos.' },
        { k: 'D', t: 'Reemplazar la planeación del sprint.' },
      ],
      correcta: 'B',
      porque: 'El refinamiento añade detalle, estimaciones y orden a los ítems para que lleguen listos a la planificación. No reemplaza el Sprint Planning.',
    },
    {
      n: 10, tema: 'Scrum', pts: 2,
      pregunta: 'Responsable de ordenar (priorizar) el Product Backlog.',
      opciones: [
        { k: 'A', t: 'El Scrum Master.' },
        { k: 'B', t: 'El equipo de desarrollo por votación.' },
        { k: 'C', t: 'El Product Owner.' },
        { k: 'D', t: 'El supervisor del contrato.' },
      ],
      correcta: 'C',
      porque: 'El Product Owner es responsable de maximizar el valor y, por tanto, de ordenar el Product Backlog. El Scrum Master facilita; el equipo estima.',
    },
    {
      n: 11, tema: 'Arquitectura', pts: 2,
      pregunta: 'En una arquitectura de N capas (Presentación, Negocio/Servicios, Datos), práctica correcta:',
      opciones: [
        { k: 'A', t: 'La presentación consulta directamente la base de datos para reducir latencia.' },
        { k: 'B', t: 'La lógica de negocio reside en la capa intermedia y la presentación se comunica con ella, nunca directamente con los datos.' },
        { k: 'C', t: 'Las entidades de base de datos se exponen tal cual al frontend, sin DTOs.' },
        { k: 'D', t: 'La capa de datos debe contener las reglas de validación del negocio.' },
      ],
      correcta: 'B',
      porque: 'Cada capa solo habla con la adyacente: Presentación → Negocio → Datos. Aísla la lógica y evita acoplar la UI al esquema físico. Es la estructura Controller → Service → Repository del backend.',
    },
    {
      n: 12, tema: 'SOLID', pts: 2,
      pregunta: "El principio de inversión de dependencias (la 'D' de SOLID) sugiere que:",
      opciones: [
        { k: 'A', t: 'Las capas de alto nivel deben depender de abstracciones (interfaces) y no de implementaciones concretas.' },
        { k: 'B', t: 'Toda clase debe tener una única dependencia.' },
        { k: 'C', t: "Las dependencias deben instanciarse siempre con 'new' dentro de cada clase." },
        { k: 'D', t: 'El frontend debe depender directamente del modelo de datos físico.' },
      ],
      correcta: 'A',
      porque: 'Alto y bajo nivel dependen de abstracciones. Por eso el controlador depende de IInstitucionService y el contenedor inyecta la implementación, en lugar de hacer new.',
    },
    {
      n: 13, tema: 'Azure DevOps', pts: 2,
      pregunta: 'Un pipeline azure-pipelines.yml con etapas Build y Deploy sirve principalmente para:',
      opciones: [
        { k: 'A', t: 'Documentar manualmente los despliegues.' },
        { k: 'B', t: 'Automatizar la integración continua y el despliegue continuo (CI/CD).' },
        { k: 'C', t: 'Reemplazar el control de versiones Git.' },
        { k: 'D', t: 'Gestionar únicamente los tableros Kanban.' },
      ],
      correcta: 'B',
      porque: 'El pipeline automatiza compilar, probar, empaquetar y desplegar en cada cambio (CI/CD), reduciendo errores manuales. Ver el azure-pipelines.yml del ejercicio 5.1.',
    },
    {
      n: 14, tema: 'Azure DevOps', pts: 2,
      pregunta: 'Una Pull Request en Azure Repos con políticas de rama configuradas permite:',
      opciones: [
        { k: 'A', t: 'Subir cambios directamente a main sin revisión.' },
        { k: 'B', t: 'Exigir revisores, build exitoso y trabajo vinculado antes de integrar cambios a la rama protegida.' },
        { k: 'C', t: 'Eliminar el historial de commits.' },
        { k: 'D', t: 'Ejecutar consultas SQL en producción.' },
      ],
      correcta: 'B',
      porque: 'Las branch policies bloquean el push directo y exigen condiciones (revisores, build verde, work items vinculados) para fusionar a main, protegiendo la rama.',
    },
  ];

  parteB: EjercicioB[] = [
    {
      id: 'Ejercicio 1', titulo: 'SQL — administración y desarrollo', pts: 19,
      items: [
        {
          sub: '1.1 Creación de tablas', pts: 6,
          enunciado: 'Tablas con PK, FK, NOT NULL razonables y un CHECK que impida cantidades negativas.',
          archivo: 'database/01-schema.sql',
          codigo:
`CREATE TABLE Institucion (
    Id        INT IDENTITY(1,1) NOT NULL,
    Codigo    VARCHAR(20)  NOT NULL,
    Nombre    VARCHAR(200) NOT NULL,
    Municipio VARCHAR(100) NOT NULL,
    Activa    BIT          NOT NULL CONSTRAINT DF_Institucion_Activa DEFAULT (1),
    CONSTRAINT PK_Institucion PRIMARY KEY (Id),
    CONSTRAINT UQ_Institucion_Codigo UNIQUE (Codigo)
);

CREATE TABLE RacionEntregada (
    Id            INT IDENTITY(1,1) NOT NULL,
    InstitucionId INT          NOT NULL,
    Fecha         DATE         NOT NULL,
    TipoRacion    VARCHAR(30)  NOT NULL,
    Cantidad      INT          NOT NULL,
    CONSTRAINT PK_RacionEntregada PRIMARY KEY (Id),
    CONSTRAINT FK_Racion_Institucion FOREIGN KEY (InstitucionId)
        REFERENCES Institucion (Id),
    CONSTRAINT CK_Racion_Cantidad CHECK (Cantidad >= 0)
);`,
          explicacion: 'PK en ambas tablas, FK de RacionEntregada hacia Institucion, NOT NULL en todas las columnas, UNIQUE en Codigo y el CHECK CK_Racion_Cantidad que rechaza cantidades negativas.',
        },
        {
          sub: '1.2 Reporte por municipio y mes', pts: 6,
          enunciado: 'Total de raciones por municipio y mes de 2026, solo instituciones activas, ordenado por total descendente.',
          archivo: 'database/04-reportes.sql',
          codigo:
`SELECT  i.Municipio,
        MONTH(r.Fecha)      AS Mes,
        SUM(r.Cantidad)     AS TotalRaciones
FROM    RacionEntregada r
JOIN    Institucion i ON i.Id = r.InstitucionId
WHERE   i.Activa = 1
  AND   r.Fecha >= '2026-01-01'
  AND   r.Fecha <  '2027-01-01'
GROUP BY i.Municipio, MONTH(r.Fecha)
ORDER BY TotalRaciones DESC;`,
          explicacion: 'El JOIN con Institucion permite filtrar Activa = 1. El rango de fechas con >= y < (en vez de YEAR(Fecha)) es SARGable, así el motor puede usar el índice. GROUP BY por municipio y mes, SUM para el total y ORDER BY descendente.',
        },
        {
          sub: '1.3 Procedimiento sp_RegistrarRacion', pts: 4,
          enunciado: 'Inserta una entrega validando que la institución exista y esté activa; si no, error controlado (THROW) sin insertar.',
          archivo: 'database/02-procedures.sql',
          codigo:
`CREATE OR ALTER PROCEDURE sp_RegistrarRacion
    @InstitucionId INT,
    @Fecha         DATE,
    @TipoRacion    VARCHAR(30),
    @Cantidad      INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Cantidad < 0
        THROW 50000, 'La cantidad no puede ser negativa.', 1;

    IF NOT EXISTS (SELECT 1 FROM Institucion
                   WHERE Id = @InstitucionId AND Activa = 1)
        THROW 50001, 'La institucion no existe o no esta activa.', 1;

    INSERT INTO RacionEntregada (InstitucionId, Fecha, TipoRacion, Cantidad)
    VALUES (@InstitucionId, @Fecha, @TipoRacion, @Cantidad);
END`,
          explicacion: 'Valida la cantidad y la existencia/actividad de la institución antes de insertar. THROW corta la ejecución con un error controlado (el backend lo traduce a HTTP 400) y nunca inserta una fila inválida.',
        },
        {
          sub: '1.4 Índice para optimizar el reporte', pts: 3,
          enunciado: 'La consulta 1.2 se ejecuta miles de veces al día y está lenta. Indique el/los índice(s) y justifique.',
          archivo: 'database/01-schema.sql',
          codigo:
`CREATE NONCLUSTERED INDEX IX_Racion_Fecha_Institucion
ON RacionEntregada (Fecha, InstitucionId)
INCLUDE (Cantidad);`,
          explicacion: 'Índice covering: la clave (Fecha, InstitucionId) resuelve el filtro por rango de fecha y el JOIN, e INCLUDE (Cantidad) permite calcular el SUM sin key lookups a la tabla base. Menos I/O y la consulta se sirve solo desde el índice.',
        },
      ],
    },
    {
      id: 'Ejercicio 2', titulo: 'API REST con .NET', pts: 16,
      items: [
        {
          sub: '2.1 InstitucionesController', pts: 10,
          enunciado: 'GET paginado/filtrado, GET/{id} con 404 si no existe, POST con validación y 201 + Location. Usa IInstitucionService inyectado y DTOs.',
          archivo: 'backend/.../Controllers/InstitucionesController.cs',
          codigo:
`[ApiController]
[Route("api/instituciones")]
public class InstitucionesController : ControllerBase
{
    private readonly IInstitucionService _service;
    public InstitucionesController(IInstitucionService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<PagedResult<InstitucionDto>>> Get(
        [FromQuery] string? municipio,
        [FromQuery] int pagina = 1,
        [FromQuery] int tamano = 20)
    {
        if (pagina < 1) pagina = 1;
        if (tamano < 1 || tamano > 100) tamano = 20;
        return Ok(await _service.ListarAsync(municipio, pagina, tamano));
    }

    [HttpGet("{id:int}", Name = "ObtenerInstitucion")]
    public async Task<ActionResult<InstitucionDto>> GetById(int id)
    {
        var dto = await _service.ObtenerPorIdAsync(id);
        return dto is null ? NotFound() : Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<InstitucionDto>> Crear([FromBody] InstitucionCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var creada = await _service.CrearAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = creada.Id }, creada);
    }
}`,
          explicacion: 'El controlador solo orquesta: depende de la interfaz IInstitucionService, nunca toca la base. NotFound() devuelve 404; CreatedAtAction devuelve 201 con el header Location hacia GET /{id}. Recibe y devuelve DTOs, no la entidad.',
        },
        {
          sub: '2.2 DTO con DataAnnotations y separación de DTOs', pts: 6,
          enunciado: 'Defina InstitucionCreateDto con validaciones y explique por qué se separan DTOs de entidades.',
          archivo: 'backend/.../Dtos/InstitucionCreateDto.cs',
          codigo:
`public class InstitucionCreateDto
{
    [Required(ErrorMessage = "El codigo es obligatorio.")]
    [StringLength(20, MinimumLength = 1)]
    public string Codigo { get; set; } = default!;

    [Required(ErrorMessage = "El nombre es obligatorio.")]
    [StringLength(200, MinimumLength = 3)]
    public string Nombre { get; set; } = default!;

    [Required(ErrorMessage = "El municipio es obligatorio.")]
    [StringLength(100)]
    public string Municipio { get; set; } = default!;

    public bool Activa { get; set; } = true;
}`,
          explicacion: 'Se separan DTOs de entidades porque: el cliente no debe fijar campos internos como el Id; se expone solo lo necesario sin filtrar columnas sensibles; las validaciones de entrada viven en el contrato de la API y no en el modelo de datos; y la API puede evolucionar sin acoplarse al esquema físico de la tabla.',
        },
      ],
    },
    {
      id: 'Ejercicio 3', titulo: 'Frontend Angular', pts: 19,
      items: [
        {
          sub: '3.1 InstitucionService (HttpClient)', pts: 5,
          enunciado: 'Servicio tipado que consume GET /api/instituciones con filtro y paginación.',
          archivo: 'frontend/src/app/services/institucion.service.ts',
          codigo:
`@Injectable({ providedIn: 'root' })
export class InstitucionService {
  private readonly baseUrl = 'http://localhost:5080/api/instituciones';
  constructor(private http: HttpClient) {}

  listar(municipio: string, pagina: number, tamano: number)
      : Observable<PagedResult<Institucion>> {
    let params = new HttpParams()
      .set('pagina', pagina)
      .set('tamano', tamano);
    if (municipio && municipio.trim())
      params = params.set('municipio', municipio.trim());
    return this.http.get<PagedResult<Institucion>>(this.baseUrl, { params });
  }
}`,
          explicacion: 'HttpParams arma el query string de forma segura. El método está tipado con genéricos (Observable<PagedResult<Institucion>>), así el componente recibe datos tipados en vez de any.',
        },
        {
          sub: '3.2 Componente lista-instituciones', pts: 10,
          enunciado: 'Tabla, búsqueda por municipio con debounce de 300 ms, estado de cargando/errores y liberación de suscripciones.',
          archivo: 'frontend/src/app/lista-instituciones/lista-instituciones.component.ts',
          codigo:
`private destroy$ = new Subject<void>();
private load$ = new Subject<void>();

ngOnInit(): void {
  this.busquedaCtrl.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe(() => { this.pagina = 1; this.load$.next(); });

  this.load$.pipe(
    startWith(void 0),
    tap(() => { this.cargando = true; this.error = null; }),
    switchMap(() => this.service.listar(this.busquedaCtrl.value, this.pagina, this.tamano)
      .pipe(catchError(() => { this.error = 'Error al cargar.'; return of(VACIO); }))),
    takeUntil(this.destroy$)
  ).subscribe(res => { this.instituciones = res.items; this.total = res.total; this.cargando = false; });
}

ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }`,
          explicacion: 'debounceTime(300) y distinctUntilChanged() evitan disparar una petición por cada tecla. switchMap cancela la búsqueda anterior si llega una nueva. catchError captura fallos HTTP y muestra el mensaje. takeUntil(destroy$) libera todas las suscripciones en ngOnDestroy.',
        },
        {
          sub: '3.3 Formulario reactivo crear institución', pts: 4,
          enunciado: 'Formulario reactivo con validaciones requeridas y de longitud; botón Guardar deshabilitado mientras sea inválido o se esté enviando.',
          archivo: 'frontend/src/app/crear-institucion/crear-institucion.component.ts',
          codigo:
`form = this.fb.nonNullable.group({
  codigo:    ['', [Validators.required, Validators.maxLength(20)]],
  nombre:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
  municipio: ['', [Validators.required, Validators.maxLength(100)]],
  activa:    [true]
});

guardar(): void {
  if (this.form.invalid) return;
  this.enviando = true;
  this.service.crear(this.form.getRawValue()).subscribe({
    next:  () => { this.enviando = false; this.form.reset({ activa: true }); },
    error: () => { this.enviando = false; this.mensajeError = 'No se pudo crear.'; }
  });
}`,
          explicacion: 'Validators.required/minLength/maxLength replican las reglas del DTO del backend. En el template el botón usa [disabled]="form.invalid || enviando", así no se envía un formulario inválido ni se hace doble submit. nonNullable hace que getRawValue() devuelva strings en lugar de string | null.',
        },
      ],
    },
    {
      id: 'Ejercicio 4', titulo: 'Arquitectura de capas — refactorización', pts: 6,
      items: [
        {
          sub: '4.1 Problemas del código legado', pts: 3,
          enunciado: 'Liste al menos cuatro problemas concretos del controlador legado (cadena con sa/123, SQL concatenado, sin capas, sin using).',
          codigo:
`1. Inyección SQL: concatena institucionId y cantidad directo en el texto del
   INSERT. Un valor malicioso ejecuta SQL arbitrario.
2. Credenciales en código: "User=sa;Password=123" en texto plano y con la cuenta
   de mayor privilegio. Deben ir en configuración o secretos.
3. Sin capas: el controlador abre conexiones y ejecuta SQL. No hay Servicio ni
   Repositorio; es imposible de testear o reutilizar.
4. La conexión no se libera (sin using/Dispose), lo que produce fuga de conexiones.
5. Síncrono y sin manejo de errores: bloquea el hilo y cualquier fallo de BD
   revienta sin control. Además el INSERT no lista las columnas.`,
          explicacion: 'Los cuatro problemas centrales son inyección SQL, credenciales embebidas, ausencia de capas y conexión sin liberar. Se suman la falta de async y de manejo de errores.',
        },
        {
          sub: '4.2 Reescritura en capas', pts: 3,
          enunciado: 'Distribución en Controller → Servicio → Repositorio con inyección de dependencias y consulta parametrizada.',
          codigo:
`[HttpPost("entregas")]
public async Task<IActionResult> Crear([FromBody] RacionCreateDto dto)
{
    if (!ModelState.IsValid) return BadRequest(ModelState);
    await _racionService.RegistrarAsync(dto);
    return StatusCode(201);
}

public Task RegistrarAsync(RacionCreateDto dto) => _repo.InsertarAsync(dto);

public async Task InsertarAsync(RacionCreateDto dto)
{
    const string sql = @"INSERT INTO RacionEntregada
        (InstitucionId, Fecha, TipoRacion, Cantidad)
        VALUES (@InstitucionId, GETDATE(), @TipoRacion, @Cantidad);";
    using var conn = _factory.Create();
    await conn.ExecuteAsync(sql, dto);
}

builder.Services.AddScoped<IRacionService, RacionService>();
builder.Services.AddScoped<IRacionRepository, RacionRepository>();`,
          explicacion: 'El controlador (Crear) valida y delega; el servicio (RegistrarAsync) aplica las reglas de negocio; el repositorio (InsertarAsync) ejecuta el INSERT parametrizado con la conexión liberada por using. En Program.cs se registran con AddScoped (inyección de dependencias) y la cadena de conexión sale de appsettings, no del código.',
        },
      ],
    },
    {
      id: 'Ejercicio 5', titulo: 'Azure DevOps — CI/CD', pts: 6,
      items: [
        {
          sub: '5.1 azure-pipelines.yml', pts: 4,
          enunciado: 'Pipeline que se dispare con cambios en main, compile la solución .NET (restore, build, test) y publique el artefacto.',
          archivo: 'azure-pipelines.yml',
          codigo:
`trigger:
  branches:
    include: [ main ]

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'

steps:
  - task: UseDotNet@2
    inputs: { packageType: 'sdk', version: '8.x' }

  - task: DotNetCoreCLI@2
    displayName: 'Restore'
    inputs: { command: 'restore', projects: '**/*.csproj' }

  - task: DotNetCoreCLI@2
    displayName: 'Build'
    inputs:
      command: 'build'
      projects: '**/*.csproj'
      arguments: '--configuration $(buildConfiguration) --no-restore'

  - task: DotNetCoreCLI@2
    displayName: 'Test'
    inputs: { command: 'test', projects: '**/*Tests.csproj' }

  - task: DotNetCoreCLI@2
    displayName: 'Publish'
    inputs:
      command: 'publish'
      publishWebProjects: true
      arguments: '--configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)'

  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: '$(Build.ArtifactStagingDirectory)'
      artifactName: 'drop'`,
          explicacion: 'El trigger en main dispara CI en cada push. Los pasos restore → build → test → publish compilan y prueban; PublishBuildArtifacts deja el paquete (artefacto drop) listo para una etapa de Deploy.',
        },
        {
          sub: '5.2 Políticas de rama para proteger main', pts: 2,
          enunciado: 'Cómo configuraría las políticas de rama y las PR para proteger main en un equipo de 4 desarrolladores.',
          codigo:
`Sobre la rama main (Branch policies en Azure Repos):
- Bloquear push directo: todo cambio entra por Pull Request.
- Exigir 2 revisores aprobados y no permitir auto-aprobación.
- Build validation: el azure-pipelines.yml debe pasar en verde para fusionar.
- Vincular work items y exigir que los comentarios queden resueltos.
- Mantener historial limpio (squash merge) y borrar la rama tras integrar.`,
          explicacion: 'Con 4 desarrolladores, pedir 2 revisores equilibra control y agilidad. La build obligatoria evita fusionar código que no compila o no pasa tests, y el push directo queda prohibido.',
        },
      ],
    },
    {
      id: 'Ejercicio 6', titulo: 'Metodología Agile — situacional', pts: 6,
      items: [
        {
          sub: '6.1 Cambio normativo urgente a mitad de sprint', pts: 6,
          enunciado: 'El supervisor pide con urgencia un cambio normativo que afecta el cálculo de raciones, pero el sprint ya tiene historias comprometidas. ¿Cómo lo maneja dentro de Scrum?',
          codigo:
`1. No alterar el Sprint en caliente: el Sprint Backlog es del Equipo. Canalizo la
   solicitud hacia el Product Owner, dueño de las prioridades.
2. El PO evalúa valor y urgencia y crea/ordena el ítem en el Product Backlog, con
   la nueva regla normativa bien especificada (criterios de aceptación).
3. Si es inaplazable, el PO y el Equipo negocian el alcance: se intercambia trabajo
   equivalente (sacar una historia para meter la nueva) cuidando el Sprint Goal.
   En caso extremo, el PO puede cancelar el Sprint.
4. Roles y ceremonias: conversación inmediata PO-Equipo, reflejada en el Daily;
   el Scrum Master facilita y protege al equipo; el cambio se reestima en refinamiento.
5. Comunicación del impacto: dejo explícito que meter X saca Y, y el supervisor
   decide con esa información. Se documenta en el work item qué entró, qué salió,
   por qué y el ajuste del compromiso del Sprint.`,
          explicacion: 'La clave es equilibrar la disciplina ágil (proteger el Sprint Goal, decidir vía Product Owner) con la realidad de la contratación pública: se negocia el alcance en lugar de añadir trabajo, y todo queda trazado.',
        },
      ],
    },
  ];

  exportarPdf(): void {
    window.print();
  }
}

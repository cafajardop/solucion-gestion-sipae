# Gestión PAE — Demo Full Stack (Angular + .NET + SQL Server)

Prueba Técnica basada en el ecosistema **SIPAE** (Programa de
Alimentación Escolar). Gestiona **Instituciones** y el registro de **Raciones
entregadas**, demostrando una arquitectura por capas de punta a punta.

## ¿Qué demuestra?

- **Backend .NET 8** — API REST con arquitectura en capas
  (Controller → Service → Repository), inyección de dependencias, DTOs
  separados de las entidades, paginación/filtrado, códigos HTTP correctos
  (200 / 201 + Location / 400 / 404) y **consultas parametrizadas** (Dapper).
- **SQL Server** — esquema con PK, FK, restricción `CHECK`, índice *covering*
  y un **procedimiento almacenado** con validación (`THROW`).
- **Frontend Angular 17 (standalone)** — servicio tipado con `HttpClient`,
  listado con **búsqueda con debounce (300 ms)**, manejo de carga/errores,
  liberación de suscripciones (`takeUntil`), paginación y un **formulario
  reactivo** con validaciones.

## Arquitectura

```
Angular (4200) HTTP  API .NET (5080)  ──Dapper──>  SQL Server (1433, Docker)
   |                          |
   componentes           Controller -> Service -> Repository
   servicio HTTP         DTOs / sp_RegistrarRacion
```

## Requisitos (instalar una vez)

1. **Docker Desktop** — para SQL Server. https://www.docker.com/products/docker-desktop/
2. **.NET 8 SDK** — https://dotnet.microsoft.com/download/dotnet/8.0
3. **Node.js LTS** + Angular CLI:
   ```bash
   npm install -g @angular/cli
   ```

Verificar que todo quedó instalado:
```bash
docker --version
dotnet --version
node --version
ng version
```

## Cómo ejecutar (3 pasos)

### 1) Base de datos (SQL Server en Docker)
Desde la raíz del proyecto:
```bash
docker compose up -d
```
Esto levanta SQL Server en `localhost:1433`. (La primera vez tarda un poco en
descargar la imagen.)

### 2) Backend (.NET API)
```bash
cd backend/GestionPae.Api
dotnet run
```
- La API queda en **http://localhost:5080**
- Documentación Swagger en **http://localhost:5080/swagger**
- En el primer arranque crea automáticamente la base, las tablas, el
  procedimiento almacenado y datos de ejemplo.

### 3) Frontend (Angular)
En otra terminal:
```bash
cd frontend
npm install
npm start
```


## Detener todo

```bash
docker compose down          # detiene SQL Server (conserva los datos)
docker compose down -v       # además borra los datos
```

## Estructura del repositorio

```
gestion-pae/
├── docker-compose.yml          # SQL Server
├── database/                   # scripts SQL (esquema, procedimiento, datos)
├── backend/GestionPae.Api/     # API .NET 8 por capas
│   ├── Controllers/  Services/  Repositories/  Dtos/  Models/  Data/
└── frontend/                   # Angular 17 (standalone)
    └── src/app/  services/  models/  lista-instituciones/  crear-institucion/
```

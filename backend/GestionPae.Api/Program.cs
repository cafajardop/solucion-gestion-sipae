using GestionPae.Api.Data;
using GestionPae.Api.Repositories;
using GestionPae.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Puerto dinamico para el hosting (Render inyecta PORT); en local usa launchSettings
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Controladores + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Inyeccion de dependencias por capas (Controller -> Service -> Repository)
builder.Services.AddSingleton<DbConnectionFactory>();
builder.Services.AddScoped<IInstitucionRepository, InstitucionRepository>();
builder.Services.AddScoped<IRacionRepository, RacionRepository>();
builder.Services.AddScoped<IInstitucionService, InstitucionService>();
builder.Services.AddScoped<IRacionService, RacionService>();

// CORS: origenes permitidos desde configuracion (Cors:Origins), por defecto el front local
var corsOrigins = (builder.Configuration["Cors:Origins"] ?? "http://localhost:4200")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
const string CorsPolicy = "frontend";
builder.Services.AddCors(options =>
    options.AddPolicy(CorsPolicy, policy =>
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

// Inicializa la BD (crea base, tablas, procedimiento y datos de ejemplo si no existen)
await DbInitializer.InitializeAsync(app.Configuration, app.Logger);

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(CorsPolicy);
app.MapControllers();
app.Run();

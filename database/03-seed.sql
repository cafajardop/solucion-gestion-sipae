-- Datos de ejemplo para que la app arranque con contenido
INSERT INTO Institucion (Codigo, Nombre, Municipio, Activa) VALUES
('IE-001', 'Institucion Educativa San Jose',   'Medellin', 1),
('IE-002', 'Colegio La Esperanza',             'Medellin', 1),
('IE-003', 'Escuela Rural El Progreso',        'Bello',    1),
('IE-004', 'Institucion Tecnica Industrial',   'Itagui',   1),
('IE-005', 'Colegio Santa Maria',              'Envigado', 0);
GO

INSERT INTO RacionEntregada (InstitucionId, Fecha, TipoRacion, Cantidad) VALUES
(1, '2026-01-15', 'ALMUERZO', 120),
(1, '2026-02-15', 'ALMUERZO', 130),
(2, '2026-01-20', 'DESAYUNO',  80),
(3, '2026-02-10', 'ALMUERZO',  60),
(4, '2026-03-05', 'ALMUERZO', 200);
GO

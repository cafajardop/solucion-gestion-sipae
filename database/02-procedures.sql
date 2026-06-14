-- Inserta una entrega validando que la institucion exista y este activa
CREATE OR ALTER PROCEDURE sp_RegistrarRacion
    @InstitucionId INT,
    @Fecha         DATE,
    @TipoRacion    VARCHAR(30),
    @Cantidad      INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Cantidad < 0
        THROW 50000, 'La cantidad no puede ser negativa.', 1;

    IF NOT EXISTS (SELECT 1 FROM Institucion WHERE Id = @InstitucionId AND Activa = 1)
        THROW 50001, 'La institucion no existe o no esta activa.', 1;

    INSERT INTO RacionEntregada (InstitucionId, Fecha, TipoRacion, Cantidad)
    VALUES (@InstitucionId, @Fecha, @TipoRacion, @Cantidad);
END
GO

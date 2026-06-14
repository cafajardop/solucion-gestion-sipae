-- Esquema del modulo simplificado SIPAE: Instituciones y Raciones entregadas
CREATE TABLE Institucion (
    Id        INT IDENTITY(1,1) NOT NULL,
    Codigo    VARCHAR(20)  NOT NULL,
    Nombre    VARCHAR(200) NOT NULL,
    Municipio VARCHAR(100) NOT NULL,
    Activa    BIT          NOT NULL CONSTRAINT DF_Institucion_Activa DEFAULT (1),
    CONSTRAINT PK_Institucion PRIMARY KEY (Id),
    CONSTRAINT UQ_Institucion_Codigo UNIQUE (Codigo)
);
GO

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
);
GO

-- Indice que acelera la consulta por rango de fecha + institucion (covering)
CREATE NONCLUSTERED INDEX IX_Racion_Fecha_Institucion
ON RacionEntregada (Fecha, InstitucionId)
INCLUDE (Cantidad);
GO

-- Total de raciones por municipio y mes de 2026 (solo instituciones activas)
SELECT  i.Municipio,
        MONTH(r.Fecha)  AS Mes,
        SUM(r.Cantidad) AS TotalRaciones
FROM    RacionEntregada r
JOIN    Institucion i ON i.Id = r.InstitucionId
WHERE   i.Activa = 1
  AND   r.Fecha >= '2026-01-01'
  AND   r.Fecha <  '2027-01-01'
GROUP BY i.Municipio, MONTH(r.Fecha)
ORDER BY TotalRaciones DESC;

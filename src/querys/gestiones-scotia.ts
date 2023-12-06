export const gestionesScotia = `
  select 
    DISTINCT 
    0 as tarea_id, 
    CAST(og.FECHA_GESTION AS CHAR) as gestion_fecha, 
    u.identificacion as usuario_id,
    og.DOCUMENTO as deudor_id,
    0 as asignacion_id,
    og.wb_PBX_TELGESTION as telefono,
    case when ca.DESCRIPCION = 'ENVIO CARTA' then 'SMS'
      when ca.DESCRIPCION = 'ENVIO SMS' then 'SMS'
      when ca.DESCRIPCION = 'ENVIO E MAIL DEUDOR' then 'EMAIL'
      when ca.DESCRIPCION = 'VISITA TERCERO' then 'VISIT'
      when ca.DESCRIPCION = 'VISITA NO ATENDIDA' then 'VISIT'
      when ca.DESCRIPCION = 'VISITA TITULAR' then 'VISIT'
      when ca.DESCRIPCION = 'VISITA RESPONSABLE' then 'VISIT'
      when ca.DESCRIPCION = 'SIN VISITAR' then 'VISIT'
    else 'LLAMADA'
    end canal,
    case when ce.DESCRIPCION = 'NO CONTESTA' then 35271
      when ce.DESCRIPCION = 'ILOCALIZADO' then 35271
      when ce.DESCRIPCION = 'MENSAJE CONTESTADOR' then 35272
      when ce.DESCRIPCION = 'SIN COMPROMISO' then 35273
      when ce.DESCRIPCION = 'YA PAGÓ' then 35274
      when ce.DESCRIPCION = 'DAÑADO' then 35271
      when ce.DESCRIPCION = 'COLGÓ' then 35275
      when ce.DESCRIPCION = 'RECORDATORIO DE PAGO' then 35276
      when ce.DESCRIPCION = 'HABLO CON OTRO' then 35277
      when ce.DESCRIPCION = 'OCUPADO' then 35275
      when ce.DESCRIPCION = 'MENSAJE OTRO' then 35277
      when ce.DESCRIPCION = 'NEGOCIACIÓN' then 35278
      when ce.DESCRIPCION = 'CALLBACK' then 35279
      when ce.DESCRIPCION = 'PROMESA DE PAGO' then 35280
      when ce.DESCRIPCION = 'NO EFECTIVO' then 35281
      when ce.DESCRIPCION = 'DEJAR VOLANTE' then 35281
      when ce.DESCRIPCION = 'ACUERDO DE PAGO' then 35280
      when ce.DESCRIPCION = 'CLIENTE YA NO VIVE' then 35282
      when ce.DESCRIPCION = 'DIRECCIÓN NO EXISTE' then 35283
      when ce.DESCRIPCION = 'ZONA DE RIESGO' then 35271
      when ce.DESCRIPCION = 'NO VIVE NO LO CONOCEN' then 35271
      when ce.DESCRIPCION = 'TERCERO INFORMA DATOS' then 35277
      when ce.DESCRIPCION = 'FUERA DE LA ZONA' then 35271
      when ce.DESCRIPCION = 'POSIBLE NEGOCIACIÓN' then 35278
      when ce.DESCRIPCION = 'ANSWER MACHINE' then 35284
      when ce.DESCRIPCION = 'BUSY' then 35271
      when ce.DESCRIPCION = 'NOT CONTACTED' then 35271
      when ce.DESCRIPCION = 'MESSAGE PLAYED' then 35271
      when ce.DESCRIPCION = 'RADICAR PROPUESTA' then 35278
      when ce.DESCRIPCION = 'DESBLOQUEO' then 35271
      when ce.DESCRIPCION = 'EFECTIVO' then 35271
    else 
      35271
    end as id_tipificacion,
    trim(og.OBSERVACION) as descripcion,
    'MANUAL' as tipo
  from obligaciones_gestion_historial og
  join usuarios u 
  on og.userID = u.userID 
  join c_acciones ca 
  on og.ACCION = ca.ACCION 
  join c_contacto cc 
  on og.CONTACTO = cc.CONTACTO 
  join c_efectos ce 
  on og.EFECTO = ce.COD
  where og.FECHA_GESTION > '2022-01-01 00:00:00'
  limit :offset, :limit
`
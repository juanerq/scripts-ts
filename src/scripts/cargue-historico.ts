import sequelize from '../db/postgres'
import { GestionCreationAttributes, Gestiones } from '../models'
import { QueryTypes } from 'sequelize'
import { csvTojson } from '../app/csv-to-json'
import { createCsv } from '../app/export-to-csv'

interface PhonesType {
  cedula: number
  ciudad: 'BOGOTA D.C'
  telefono1: number
  telefono2?: number
  telefono3?: number
  telefono4?: number
} 

const SCHEMA = 'cbpo_confirmeza_wiser'
const tipificacionId = 442
const fileName = 'confirmeza'
const filePath = `historicos/${fileName}.csv`

const regexTimestamp = /(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} [a-z]m)/g;
const regexPhones = /(\d{10})/g;


const listManagements: GestionCreationAttributes[] = []
const listPhones: PhonesType[] = []

;(async () => {
  const replacements: [string | RegExp, string][] = [
    ['/23', '/2023 '],
    ['buz�n', 'buzon'],
    ['�', ''],
    ['p.m', 'pm'],
    ['p. m', 'pm'],
    ['a.m', 'am'],
    ['a. m', 'am'],
    [/\s+/g, ' ']
  ]
  const rows = await csvTojson<{ cedula: string, historial: string }>(filePath, replacements)

  
  for(const row of rows) {
    const { cedula: deudor_id, historial: observation } = row

    const managements = observation.split('\n')
      .filter(management => management.length > 1)
      .map(management => management.trim())


    for(const management of managements) {
      const dateManagementStrg = management.match(regexTimestamp)?.[0];
      
      if(dateManagementStrg) {
        let phones = management.match(regexPhones)
        
        if(!phones?.length && management === '') continue
        
        if(phones?.length) {
          const phonesArray = Array.from(new Set(phones))

          listPhones.push(
            {
              cedula: +deudor_id,
              ciudad: 'BOGOTA D.C',
              telefono1: +phonesArray[0],
              telefono2: phonesArray[1] ? +phonesArray[1] : 0,
              telefono3: phonesArray[2] ? +phonesArray[2] : 0,
              telefono4: phonesArray[3] ? +phonesArray[3] : 0
            }
          )
        }

        const dateManagement = formatDate(dateManagementStrg)
        
        const description = management
          .replace(dateManagementStrg, '')
          .replace('. ', '')
          .replace('.', '')
          .replace(':', '')
          .trim()

        if(description.length < 5) continue

        const dataManagement = {
          deudor_id,
          tarea_id: 0,
          usuario_id: 'HISTORICO',
          gestion_fecha: dateManagement,
          dateManagementStrg,
          asignacion_id: 0,
          telefono: phones?.[0] != null ? +phones[0] : 0,
          canal: 'LLAMADA',
          id_tipificacion: tipificacionId,
          descripcion: description,
        }

        listManagements.push(dataManagement)
      }
    }
  }
  console.log(listManagements);
  console.log(listManagements.length);
  console.log('Num Phones', listPhones.length);
  
  
  await createCsv(listPhones, `phones_${fileName}`)
  const managements = await createManagements(listManagements)
  console.log(managements.length, 'managements created');
  
})()


function formatDate(dateStrg: string) {
  const [date, hour, type] = dateStrg.split(' ');
  const [day, month, year] = date.split('/');

  const validDate = `${year}/${month}/${day}`
  const validHour = hour != null && type != null 
    ? `${hour}:${type}` : ''

  const dateObj = new Date(`${validDate} ${validHour}`);

  return dateObj
}


async function restartSequenceTableGestiones (schemaName: string) {
  const queryMaxNumPk = `SELECT MAX(gestion_id) + 10 as id FROM ${schemaName}.gestiones;`
  const resultMaxNumPk = await sequelize.query(queryMaxNumPk, { type: QueryTypes.SELECT  }) as [{ id: number }]
  
  const queryAlterSequence = `ALTER SEQUENCE ${schemaName}.gestiones_gestion_id_seq RESTART WITH ${+resultMaxNumPk[0].id};`
  await sequelize.query(queryAlterSequence)
}

async function createManagements(managements: GestionCreationAttributes[]) {
  await restartSequenceTableGestiones(SCHEMA)

  return Gestiones.schema(SCHEMA).bulkCreate(managements, { ignoreDuplicates: true })
}
import mysql from '../db/mysql'
import { gestionesScotia } from '../querys/gestiones-scotia'
import { GestionCreationAttributes, Gestiones } from '../models/index'

const SCHEMA = 'cbpo_colpatria_wiser'

export default async function uploadManagementsSco () {

  let offset = 5000000
  const limit = 500000

  console.log('🚀 Start...');
  

  for(let i = 0; i <= 10000000; i+=limit) {

    const [gestiones] = await mysql.query(gestionesScotia, 
      { 
        raw: true, 
        replacements: {
          limit, offset
        } 
      }
    ) as Array<GestionCreationAttributes[]>

    console.log(gestiones[0]);

    await Gestiones.schema(SCHEMA).bulkCreate(gestiones, {
      ignoreDuplicates: true
    })
      
    offset += limit
    console.log({ offset, numGestiones: gestiones.length });
  }

  
}
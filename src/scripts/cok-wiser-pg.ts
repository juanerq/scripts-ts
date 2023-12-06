import mongoose, { Schema } from 'mongoose';
import config from '../config';
import { Deudores, DeudoresAttributes, Obligaciones, ObligacionesCreationAttributes } from '../models/index';
import { Op } from 'sequelize';

const schema = 'cbpo_carteraok_wiser'
const URI = `${config.mongo_wiser}${schema}`

const connection = mongoose.createConnection(URI)

export async function migrateMongoWiserToPg() {  
  const obligaciones = await Obligaciones.schema(schema).findAll({ 
    where: { factura: { [Op.not]: null } }, 
    attributes: ['factura', 'deudor_id', 'obligacion_id']
  })
  
  const AsignacionSchema = new Schema({
    obligacion_id: String,
    deudor_id: String,
    factura: String,
    user_dni: String,
    nombre_pais: String,
    company: String,
  });
  const AsignacionModel = connection.model('asignaciones', AsignacionSchema);

  const obligacionesMongo: any[] = await AsignacionModel.find({
    obligacion_id: { '$nin': obligaciones.map(o => o.dataValues.obligacion_id) },
    asignacion_id: { '$in': ['141', '143', 141, 143] }
  })

  const listDebtorsMongo =  [...new Set(obligacionesMongo.map(({ _doc: data }: any) => data.deudor_id) )]
  
  const debtorsExistsWiser = await Deudores.schema(schema).findAll({ 
    where: { 
      deudor_id: listDebtorsMongo
    }
  })

  const listDebtorsWiser =  [...new Set(debtorsExistsWiser.map(e => e.getDataValue('deudor_id')) )]

  const newObligaciones = []
  const newDeudores: Record<string, DeudoresAttributes> = {}

  let count = 10
  for(const { _doc:data } of obligacionesMongo) {    

    if(data.company === 'Test User') {
      continue
    }

    const obligacion_id = `LQ_${53556 + count}`
    newObligaciones.push({
      obligacion_id: obligacion_id,
      deudor_id: data.deudor_id,
      factura: data.factura,
      campo_oblig_2: data.user_dni,
      campo_oblig_3: data.nombre_pais,
      campo_oblig_4: data.company.trim().toUpperCase(),
    })
    console.log(data._id);
    
    await AsignacionModel.findByIdAndUpdate(data._id, { obligacion_id })

    count++
  }
  
  //await Deudores.schema(schema).bulkCreate(Object.values(newDeudores))
  //await Obligaciones.schema(schema).bulkCreate(newObligaciones)
  //console.log(newObligaciones);
  //console.log(obligacionesPg.filter(e => e.obligacion_id == 'NO_HOMOLOGACION'));
  
}
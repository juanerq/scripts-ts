import { csvTojson } from "../app/csv-to-json"
import sequelize from "../db/postgres"
import { Acuerdos } from "../models/acuerdos.model"
import { AcuerdosDeudores } from "../models/grupo_acuerdos.model"

const fileName = 'negociaciones'
const filePath = `files/${fileName}.csv`

type Atribucion = 'ASESOR' | 'ALTA' 

interface Negociacion {
  identificacion: string
  atribucion: Atribucion
  descuento: string
  saldo_capital: number
  cantidad_cuotas: number
  valor_cuota: number
  fecha_pago_cuota: string
}

const TIPO_ACUERDOS = {
  cuotas: 1,
  contado: 2
}

const TIPO_AUTORIZACION: { [key in Atribucion]: number } = {
  ASESOR: 1,
  ALTA: 2
}

export async function uploadManagements() {
  const rows = await csvTojson<Negociacion>(filePath)
  const negotiation: { [key: string]: Negociacion[] } = {}

  for(const row of rows) {
    const key = `${row.identificacion}-${row.saldo_capital}`

    if(!negotiation[key]) negotiation[key] = []

    negotiation[key].push(row)    
  }

  /* const errors = Object.entries(negotiation).filter(([key, value]) => +value[0].cantidad_cuotas > value.length)
  for(const err of errors) {
    console.log(err[0], err[1][0].cantidad_cuotas, err[1].length);

  } */
  
  for(const key in negotiation) {
    const acuerdos = negotiation[key]
    const [deudor_id, saldo_capital] = key.split('-')

    await sequelize.transaction(async t => {

      /* const group = await AcuerdosDeudores.create({
        deudor_id: parseInt(deudor_id),
        pagar_valor: parseFloat(saldo_capital),
        fecha_creacion: new Date()
      }, { transaction: t }) */
  
      
      const newAcuerdos = acuerdos.map(row => {
        const datePayment = row.fecha_pago_cuota.split('/').reverse().map(e => e.padStart(2, '0')).join('-')
        console.log(new Date(datePayment).toISOString(), datePayment);
        
        return {
          deudor_id: +row.identificacion,
          descuento: parseFloat(row.descuento),
          tipo_acuerdo_id: row.cantidad_cuotas > 1 ? TIPO_ACUERDOS.cuotas : TIPO_ACUERDOS.contado,
          tipo_autorizacion: TIPO_AUTORIZACION[row.atribucion],
          saldo_capital: Number(row.saldo_capital),
          cuotas: +row.cantidad_cuotas,
          valor_cuota: +row.valor_cuota,
          fecha_pago: new Date(datePayment),
          grupo_acuerdo_id: 1
        }
      })

      //await Acuerdos.bulkCreate(newAcuerdos, { transaction: t })
    })    


    
  }

}

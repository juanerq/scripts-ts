import { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/postgres";

interface AcuerdosDeudoresAttributes {
  id: number
  deudor_id: number
  estado_acuerdo_id?: number
  fecha_ultimo_acuerdo?: Date
  fecha_ultima_actualizacion?: Date
  pagar_valor: number
  fecha_creacion?: Date
}

export type AcuerdosDeduoresCreationAttributes = Omit<AcuerdosDeudoresAttributes, 'id'>

const tableName = 'acuerdos_deudores'

export const AcuerdosDeudores: ModelDefined<
  AcuerdosDeudoresAttributes,
  AcuerdosDeduoresCreationAttributes
> = sequelize.define(tableName, 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    deudor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado_acuerdo_id: {
      type: DataTypes.INTEGER
    },
    fecha_ultimo_acuerdo: {
      type: DataTypes.DATE
    },
    fecha_ultima_actualizacion: {
      type: DataTypes.DATE
    },
    pagar_valor: {
      type: DataTypes.INTEGER
    },
    fecha_creacion: {
      type: DataTypes.DATE
    }
  },
  {
    schema: 'admon',
    timestamps: false,
    freezeTableName: true,
    tableName
  }
)
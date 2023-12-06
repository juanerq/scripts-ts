import { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/postgres";

interface AcuerdoAttributes {
  id: number
  deudor_id: number
  tipo_acuerdo_id: number
  estado_acuerdo_id?: number
  tipo_autorizacion: number
  descuento: number
  fecha_pago: Date
  saldo_capital: number
  cuotas: number
  valor_cuota: number
  grupo_acuerdo_id: number
  estado?: number
}

export type AceurdoCreationAttributes = Omit<AcuerdoAttributes, 'id'>

const tableName = 'acuerdos'

export const Acuerdos: ModelDefined<
  AcuerdoAttributes,
  AceurdoCreationAttributes
> = sequelize.define(tableName, {
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
    tipo_acuerdo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado_acuerdo_id: {
      type: DataTypes.INTEGER
    },
    tipo_autorizacion: {
      type: DataTypes.INTEGER
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    saldo_capital: {
      type: DataTypes.INTEGER
    },
    cuotas: {
      type: DataTypes.INTEGER
    },
    valor_cuota: {
      type: DataTypes.INTEGER
    },
    grupo_acuerdo_id: {
      type: DataTypes.INTEGER
    },
    estado: {
      type: DataTypes.INTEGER
    }
  },
  {
    schema: 'admon',
    timestamps: false,
    freezeTableName: true,
    tableName
  }
)
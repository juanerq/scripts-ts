import { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/postgres";

interface ObligacionesAttributes {
  obligacion_id: string
  factura: string | null
  deudor_id: string
  obligacion_estado?: boolean
  campo1?: string
  campo2?: string
  campo3?: string
  campo_oblig_1?: string
  campo_oblig_2?: string
  campo_oblig_3?: string
  campo_oblig_4?: string
  campo_oblig_5?: string
}

export type ObligacionesCreationAttributes = Omit<ObligacionesAttributes, 'obligacion_id'>

const tableName = 'obligaciones'

export const Obligaciones: ModelDefined<
  ObligacionesAttributes, 
  ObligacionesCreationAttributes
> = sequelize.define(tableName, {
    factura: {
      type: DataTypes.STRING,
      allowNull: false
    },
    obligacion_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    deudor_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    obligacion_estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    campo1: {
      type: DataTypes.STRING
    },
    campo2: {
      type: DataTypes.STRING
    },
    campo3: {
      type: DataTypes.STRING
    },
    campo_oblig_1: {
      type: DataTypes.STRING
    },
    campo_oblig_2: {
      type: DataTypes.STRING
    },
    campo_oblig_3: {
      type: DataTypes.STRING
    },
    campo_oblig_4: {
      type: DataTypes.STRING
    },
    campo_oblig_5: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName,
  }
)


import { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/postgres";

export interface DeudoresAttributes {
  deudor_id: string
  deudor_nombre: string
  deudor_estado?: boolean
}
const tableName = 'deudores'

export const Deudores: ModelDefined<
  DeudoresAttributes, 
  DeudoresAttributes
> = sequelize.define(tableName, {
    deudor_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    deudor_nombre: {
      type: DataTypes.STRING
    },
    deudor_estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName,
  }
)


import { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/postgres";

interface GestionAttributes {
  gestion_id: number
  tarea_id: number
  deudor_id: string
  usuario_id: string
  gestion_fecha: Date
  asignacion_id: number
  telefono: number
  canal: string
  id_tipificacion: number
  descripcion: string
}

export type GestionCreationAttributes = Omit<GestionAttributes, 'gestion_id'>

const tableName = 'gestiones'

export const Gestiones: ModelDefined<
  GestionAttributes, 
  GestionCreationAttributes
> = sequelize.define(tableName, {
    gestion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tarea_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deudor_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gestion_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    asignacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    canal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_tipificacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName,
  }
)


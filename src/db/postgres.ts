import { Sequelize } from "sequelize";
import config from "../config";

const URL = `postgres://${config.pg_username}:${config.pg_password}@${config.pg_host}:${config.pg_port}/${config.pg_db}`;
console.log(URL);

const sequelize = new Sequelize(URL,
  { 
    logging: false,
    timezone: 'America/Bogota',
    pool: {"acquire": 240000,"max":30,"idle":20000},
  }
)

;(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})

export default sequelize
import { Sequelize } from "sequelize";
import config from "../config";

const URL = `mysql://desarrollo:soportE*8994@10.150.1.158:3306/scotia`;
console.log(URL);

const mysql = new Sequelize(URL,
  { 
    logging: false
  }
)

;(async () => {
  try {
    await mysql.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})

export default mysql
import dotenv from 'dotenv'
dotenv.config()


interface ConfigEnvType {
  development: Record<EnvsType, string | undefined>
  production: Record<EnvsType, string | undefined>
}

type EnvsType = 'pg_username' | 'pg_password' | 'pg_db' | 'pg_host' | 'pg_port' | 'mongo_wiser'


const config: ConfigEnvType = {
  development: {
    pg_username: process.env.DEV_PG_USERNAME,
    pg_password: process.env.DEV_PG_PASSWORD,
    pg_db: process.env.DEV_PG_DB,
    pg_host: process.env.DEV_PG_HOST,
    pg_port: process.env.DEV_PG_PORT,
    mongo_wiser: process.env.DEV_MONGO_WISER,
  },
  production: {
    pg_username: process.env.PROD_PG_USERNAME,
    pg_password: process.env.PROD_PG_PASSWORD,
    pg_db: process.env.PROD_PG_DB,
    pg_host: process.env.PROD_PG_HOST,
    pg_port: process.env.PROD_PG_PORT,
    mongo_wiser: process.env.PROD_MONGO_WISER,
  }
}

const nodeEnv = process.env.NODE_ENV as keyof ConfigEnvType

export default config[nodeEnv]
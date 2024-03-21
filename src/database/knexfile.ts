import { Knex } from "knex";
import { DB } from "../config/config";

const config: Knex.Config = {
    client: "mysql",
    connection: {
        host: DB.HOST,
        port: Number(DB.PORT),
        user: DB.USER,
        password: DB.PASSWORD,
        database: DB.NAME
    },
    useNullAsDefault: true,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "migrations",
    },
    seeds:{
      directory: "./seeds/"
    },
    debug: true,
    log: {
        debug({ bindings, sql }: any) {
            console.log('RUNNING QUERY = ', sql, bindings);
        }
    }
};

export default config;
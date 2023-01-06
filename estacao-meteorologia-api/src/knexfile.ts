import { Knex } from "knex";
import "dotenv/config";

import { env } from "./config/env";

export default {
  client: "postgres",
  connection: {
    user: env.database.postgres.user,
    password: env.database.postgres.password,
    host: env.database.postgres.host,
    port: Number(env.database.postgres.port),
    database: env.database.postgres.database,
    ssl: { rejectUnauthorized: false }
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./shared/infra/database/migrations",
  },
  seeds: {
    directory: "./shared/infra/database/seeds",
  },
} as Knex.Config;

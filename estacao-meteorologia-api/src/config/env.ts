import "dotenv/config";

export const env = {
  port: process.env.PORT ?? 8080,
  database: {
    postgres: {
      host: process.env.DATABASE_POSTGRES_HOST,
      port: process.env.DATABASE_POSTGRES_PORT,
      user: process.env.DATABASE_POSTGRES_USER,
      password: process.env.DATABASE_POSTGRES_PASSWORD,
      database: process.env.DATABASE_POSTGRES_DATABASE,
      ssl: process.env.DATABASE_POSTGRES_SSL,
    },
  },
};

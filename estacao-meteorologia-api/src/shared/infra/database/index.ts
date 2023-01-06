import knex from "knex";
import database_config from "../../../knexfile";

export const database = knex(database_config);

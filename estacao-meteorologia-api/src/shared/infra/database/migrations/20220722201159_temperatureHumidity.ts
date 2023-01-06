import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
    await knex.schema.createTable("temperatureHumidity", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("temperature", 50).notNullable();
      table.string("humidity", 100).notNullable();
      table.boolean("smoke").notNullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.raw("now()"));
      table.dateTime("updated_at").notNullable().defaultTo(knex.raw("now()"));
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("temperatureHumidity");
}

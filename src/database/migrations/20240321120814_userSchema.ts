import type { Knex } from "knex";
import { CATEGORIES, USERINTRESTS, USERS } from "../tableNames";


export async function up(knex: Knex): Promise<void> {

    return knex.schema
        .createTable(USERS, function (table) {
            table.bigIncrements('userId').primary();
            table.string('name', 255).notNullable();
            // actual email length should be 255 but using 500 because faker is generating long format emails.
            table.string('email', 500).notNullable().unique();
            table.string('password').notNullable();
            table.string("emailOtp", 10);
            table.boolean('isEmailVerified').defaultTo(false);
            table.boolean('isActive').defaultTo(true);
            table.timestamps(true, true);
            table.index(['userId', 'email'])
        })
        .createTable(CATEGORIES, function (table) {
            table.increments('categoryId').primary();
            table.string('categoryName').notNullable();
            table.boolean('isActive').defaultTo(true);
            table.timestamps(true, true);
            table.index(['categoryId'])
        })
        .createTable(USERINTRESTS, function (table) {
            table.bigIncrements('userId').unsigned().notNullable();
            table.foreign('userId').references('userId').inTable('users');
            table.text('categoryIds');
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(USERINTRESTS)
        .dropTableIfExists(CATEGORIES)
        .dropTableIfExists(USERS)
}


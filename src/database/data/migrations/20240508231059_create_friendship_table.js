exports.up = function(knex) {
    return knex.schema.createTable("friendship", table => {
        table.increments("id").primary();
        table.integer("principal_user_id").unsigned().notNullable().references("id").inTable("user");
        table.integer("friend_id").unsigned().notNullable().references("id").inTable("user");
        table.timestamps(true, true);
        table.boolean("is_active").notNullable().defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("friendship");
};

exports.up = function(knex) {
    return knex.schema.createTable("token", table => {
        table.increments("id").primary();
        table.string("value").notNullable();
        table.integer("user_id").unsigned().notNullable().references("id").inTable("user");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("token");
};

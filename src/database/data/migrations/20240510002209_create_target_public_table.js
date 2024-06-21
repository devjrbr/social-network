exports.up = function(knex) {
    return knex.schema.createTable("target_public", table => {
        table.increments("id").primary();
        table.string("type").notNullable();
        table.boolean("is_active").notNullable().defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("target_public");
};

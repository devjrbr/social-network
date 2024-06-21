exports.up = function(knex) {
    return knex.schema.createTable("file_type", table => {
        table.increments("id").primary();
        table.string("type").notNullable();
        table.boolean("is_active").notNullable().defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("file_type");
};

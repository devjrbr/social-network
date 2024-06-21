exports.up = function(knex) {
    return knex.schema.createTable("reaction_type", table => {
        table.increments("id").primary();
        table.string("description").notNullable();
        table.boolean("is_active").defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reaction_type");
};

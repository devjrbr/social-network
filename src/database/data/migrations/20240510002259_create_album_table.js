exports.up = function(knex) {
    return knex.schema.createTable("album", table => {
        table.increments("id").primary();
        table.string("description").notNullable();
        table.integer("target_id").unsigned().notNullable().references("id").inTable("target_public");
        table.timestamps(true, true);
        table.boolean("is_active").defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("album");
};

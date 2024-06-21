exports.up = function(knex) {
    return knex.schema.createTable("post", table => {
        table.increments("id").primary();
        table.string("description").notNullable();
        table.integer("user_id").unsigned().notNullable().references("id").inTable("user");
        table.integer("target_id").unsigned().notNullable().references("id").inTable("target_public");
        table.integer("type_id").unsigned().notNullable().references("id").inTable("file_type");
        table.timestamps(true, true);
        table.boolean("is_active").defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("post");
};

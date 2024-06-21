exports.up = function(knex) {
    return knex.schema.createTable("reaction", table => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable().references("id").inTable("user");
        table.integer("reaction_type_id").unsigned().notNullable().references("id").inTable("reaction_type");
        table.integer("post_id").unsigned().notNullable().references("id").inTable("post");
        table.timestamps(true, true);
        table.boolean("is_active").defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reaction");
};

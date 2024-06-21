exports.up = function(knex) {
    return knex.schema.createTable("comment", table => {
        table.increments("id").primary();
        table.string("description");
        table.integer("user_id").unsigned().notNullable().references("id").inTable("user");
        table.integer("post_id").unsigned().notNullable().references("id").inTable("post");
        table.timestamps(true, true);
        table.boolean("is_active").defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("comment");
};

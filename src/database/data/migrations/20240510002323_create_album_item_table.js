exports.up = function(knex) {
    return knex.schema.createTable("album_item", table => {
        table.increments("id").primary();
        table.integer("post_id").unsigned().notNullable().references("id").inTable("post");
        table.integer("album_id").unsigned().notNullable().references("id").inTable("album");
        table.timestamps(true, true);
        table.boolean("is_active").defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("album_item");
};

exports.up = function(knex) {
    return knex.schema.createTable("friendship_request", table => {
        table.increments("id").primary();
        table.integer("sender_id").unsigned().notNullable().references("id").inTable("user");
        table.integer("receiver_id").unsigned().notNullable().references("id").inTable("user");
        table.integer("request_type_id").unsigned().notNullable().references("id").inTable("friendship_request_type");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("friendship_request");
};

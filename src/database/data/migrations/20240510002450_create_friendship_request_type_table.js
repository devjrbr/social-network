exports.up = function(knex) {
    return knex.schema.createTable("friendship_request_type", table => {
        table.increments("id").primary();
        table.string("type");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("friendship_request_type");
};

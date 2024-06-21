exports.up = knex =>
    knex.schema.createTable("user", table => {
        table.increments('id');
        table.string("full_name", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("password", 255).notNullable();
        table.timestamps(true, true);
        table.boolean("is_active").defaultTo(true);
    });

exports.down = knex => knex.schema.dropTableIfExists("user");

require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql2',
        connection: "mysql://root:dev123@localhost:3306/social_network",
        searchPath: ['knex', 'public'],
        migrations: {
            directory: '../data/migrations',
        },
        seeds: {
            directory: '../data/seeds',
        }
    },
    test: {
        client: 'mysql2',
        connection: "mysql://root:dev123@localhost:3306/social_network",
        searchPath: ['knex', 'public'],
        migrations: {
            directory: '../data/migrations',
        },
        seeds: {
            directory: '../data/seeds',
        }
    }    
};

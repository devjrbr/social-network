exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {
          full_name: 'Jackson Santana',
          email: 'jackson@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.1',
          is_active: true
        },
        {
          full_name: 'Renato Cariani',
          email: 'tiozao@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.2',
          is_active: true
        },
        {
          full_name: 'Fernanda Oliveira',
          email: 'fernanda@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.3',
          is_active: true
        },
        {
          full_name: 'Lucas Silva',
          email: 'lucas@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.4',
          is_active: true
        },
        {
          full_name: 'Camila Pereira',
          email: 'camila@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.5',
          is_active: true
        },
        {
          full_name: 'Rafael Martins',
          email: 'rafael@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.6',
          is_active: true
        },
        {
          full_name: 'Amanda Oliveira',
          email: 'amanda@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.7',
          is_active: true
        },
        {
          full_name: 'Pedro Almeida',
          email: 'pedro@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.8',
          is_active: true
        },
        {
          full_name: 'Larissa Santos',
          email: 'larissa@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.9',
          is_active: true
        },
        {
          full_name: 'Gustavo Lima',
          email: 'gustavo@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.10',
          is_active: true
        },
        {
          full_name: 'Ana Oliveira',
          email: 'ana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.11',
          is_active: true
        },
        {
          full_name: 'Carlos Silva',
          email: 'carlos@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.12',
          is_active: true
        },
        {
          full_name: 'Mariana Costa',
          email: 'mariana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.13',
          is_active: true
        },
        {
          full_name: 'Ricardo Oliveira',
          email: 'ricardo@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.14',
          is_active: true
        },
        {
          full_name: 'Isabela Santos',
          email: 'isabela@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.15',
          is_active: true
        },
        {
          full_name: 'Leandro Souza',
          email: 'leandro@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.16',
          is_active: true
        },
        {
          full_name: 'Juliana Lima',
          email: 'juliana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.17',
          is_active: true
        },
        {
          full_name: 'Bruno Alves',
          email: 'bruno@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.18',
          is_active: true
        },
        {
          full_name: 'Carolina Silva',
          email: 'carolina@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.19',
          is_active: true
        },
        {
          full_name: 'Vinícius Oliveira',
          email: 'vinicius@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.20',
          is_active: true
        },
        {
          full_name: 'Tatiane Souza',
          email: 'tatiane@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.21',
          is_active: true
        },
        {
          full_name: 'Eduardo Lima',
          email: 'eduardo@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.22',
          is_active: true
        },
        {
          full_name: 'Beatriz Almeida',
          email: 'beatriz@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.23',
          is_active: true
        },
        {
          full_name: 'André Santos',
          email: 'andre@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.24',
          is_active: true
        },
        {
          full_name: 'Fernando Oliveira',
          email: 'fernando@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.25',
          is_active: true
        },
        {
          full_name: 'Luana Silva',
          email: 'luana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.26',
          is_active: true
        },
        {
          full_name: 'Gabriel Lima',
          email: 'gabriel@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.27',
          is_active: true
        },
        {
          full_name: 'Mariana Alves',
          email: 'mariana.alves@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.28',
          is_active: true
        },
        {
          full_name: 'Rafaela Oliveira',
          email: 'rafaela@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.29',
          is_active: true
        },
        {
          full_name: 'Thiago Costa',
          email: 'thiago@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.30',
          is_active: true
        }
      ]);
    });
};

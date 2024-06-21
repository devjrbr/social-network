exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        {
          description: 'Eu com meu mano Mickey',
          user_id: 25,
          target_id: 1,
          type_id: 1,
          created_at: new Date('2022-04-01T08:30:00'),
          updated_at: new Date('2022-04-01T08:32:00'),
          is_active: true
        },
        {
          description: 'Minha mãe passando mal na montanha russa',
          user_id: 26,
          target_id: 1,
          type_id: 1,
          created_at: new Date('2022-12-28T15:45:00'),
          updated_at: new Date('2022-12-28T15:48:00'),
          is_active: true
        },
        {
          description: 'Jacaré invadiu a piscina de casa',
          user_id: 27,
          target_id: 1,
          type_id: 1,
          created_at: new Date('2022-02-12T20:12:00'),
          updated_at: new Date('2022-02-12T20:15:00'),
          is_active: true
        },
        {
          description: 'Eu dando mortal',
          user_id: 22,
          target_id: 1,
          type_id: 2,
          created_at: new Date('2022-03-05T12:00:00'),
          updated_at: new Date('2022-03-05T12:05:00'),
          is_active: true
        },
        {
          description: 'Olha essa água',
          user_id: 23,
          target_id: 1,
          type_id: 2,
          created_at: new Date('2022-01-04T09:30:00'),
          updated_at: new Date('2022-01-04T09:35:00'),
          is_active: true
        },
        {
          description: 'Treino e dieta nas maldivas',
          user_id: 24,
          target_id: 1,
          type_id: 2,
          created_at: new Date('2022-08-03T18:20:00'),
          updated_at: new Date('2022-08-03T18:25:00'),
          is_active: true
        },
        {
          description: 'Bolo da Sodiê',
          user_id: 3,
          target_id: 2,
          type_id: 1,
          created_at: new Date('2023-09-28T22:00:00'),
          updated_at: new Date('2023-09-28T22:05:00'),
          is_active: true
        },
        {
          description: 'Eu e meu primo rico',
          user_id: 3,
          target_id: 2,
          type_id: 1,
          created_at: new Date('2023-11-28T21:45:00'),
          updated_at: new Date('2023-11-28T21:50:00'),
          is_active: true
        },
        {
          description: 'Amanhã começo a dieta',
          user_id: 4,
          target_id: 1,
          type_id: 4,
          created_at: new Date('2018-02-27T15:30:00'),
          updated_at: new Date('2018-02-27T15:35:00'),
          is_active: true
        },
        {
          description: 'Praia das toninhas nunca mais',
          user_id: 5,
          target_id: 1,
          type_id: 2,
          created_at: new Date('2014-02-25T14:20:00'),
          updated_at: new Date('2014-02-25T14:25:00'),
          is_active: true
        },
        {
          description: 'Como editar foto',
          user_id: 6,
          target_id: 1,
          type_id: 4,
          created_at: new Date('2022-03-01T09:45:00'),
          updated_at: new Date('2022-03-01T09:50:00'),
          is_active: true
        },
        {
          description: 'Sonho realizado',
          user_id: 7,
          target_id: 2,
          type_id: 1,
          created_at: new Date('2014-02-26T12:30:00'),
          updated_at: new Date('2014-02-26T12:35:00'),
          is_active: true
        },
        {
          description: 'Enfim formado',
          user_id: 8,
          target_id: 1,
          type_id: 4,
          created_at: new Date('2017-03-02T16:15:00'),
          updated_at: new Date('2017-03-02T16:20:00'),
          is_active: true
        },
        {
          description: 'Esse ano o concurso chega',
          user_id: 9,
          target_id: 2,
          type_id: 1,
          created_at: new Date('2019-02-28T08:00:00'),
          updated_at: new Date('2019-02-28T08:05:00'),
          is_active: true
        },
        {
          description: 'Construí uma cabana no Alaska',
          user_id: 28,
          target_id: 4,
          type_id: 2,
          created_at: new Date('2002-02-25T19:40:00'),
          updated_at: new Date('2002-02-25T19:45:00'),
          is_active: true
        },
        {
          description: 'Hoje irei para o show do Guns',
          user_id: 29,
          target_id: 4,
          type_id: 2,
          created_at: new Date('2002-02-25T19:40:00'),
          updated_at: new Date('2002-02-25T19:45:00'),
          is_active: true
        },
        {
          description: 'Que calor, parece que estamos no sol',
          user_id: 30,
          target_id: 4,
          type_id: 2,
          created_at: new Date('2002-02-25T19:40:00'),
          updated_at: new Date('2002-02-25T19:45:00'),
          is_active: true
        }
      ]);
    });
};

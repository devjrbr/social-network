exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('album').del()
    .then(function () {
      // Inserts seed entries
      return knex('album').insert([
        {
          description: 'Férias em Orlando',
          target_id: 1,
          is_active: true,
        },
        {
          description: 'Férias nas Maldivas',
          target_id: 1,
          is_active: true,
        },
        {
          description: 'Aniversário de 40 anos',
          target_id: 2,
          is_active: true,
        },
        {
          description: 'Aniversário da irmãzinha',
          target_id: 2,
          is_active: true,
        },
        {
          description: 'Ubatubão',
          target_id: 1,
          is_active: true,
        },
        {
          description: 'Meu job',
          target_id: 2,
          is_active: true,
        },
        {
          description: 'Casa nova',
          target_id: 1,
          is_active: true,
        },
        {
          description: 'Formatura',
          target_id: 1,
          is_active: true,
        },
        {
          description: 'Grupo de estudos',
          target_id: 2,
          is_active: true,
        },
        {
          description: 'Cabana no Alaska',
          target_id: 4,
          is_active: true,
        }
      ]);
    });
};

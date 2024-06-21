exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('target_public').del()
    .then(function () {
      // Inserts seed entries
      return knex('target_public').insert([
        {
          type: 'public',
          is_active: true
        },
        {
          type: 'friends',
          is_active: true
        },
        {
          type: 'friends except',
          is_active: true
        },
        {
          type: 'only me',
          is_active: true
        },
        {
          type: 'custom',
          is_active: true
        }
      ]);
    });
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reaction_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('reaction_type').insert([
        {
          description: 'like',
          is_active: true
        },
        {
          description: 'love',
          is_active: true
        },
        {
          description: 'haha',
          is_active: true
        },
        {
          description: 'wow',
          is_active: true
        },
        {
          description: 'sad',
          is_active: true
        },
        {
          description: 'angry',
          is_active: true
        }
      ]);
    });
};

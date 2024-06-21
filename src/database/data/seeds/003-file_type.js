exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('file_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('file_type').insert([
        {
          type: 'png',
          is_active: true
        },
        {
          type: 'jpeg',
          is_active: true
        },
        {
          type: 'mp4',
          is_active: true
        },
        {
          type: 'gif',
          is_active: true
        }
      ]);
    });
};

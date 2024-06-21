exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('album_item').del()
    .then(function () {
      // Inserts seed entries
      return knex('album_item').insert([
        {
          post_id: 1,
          album_id: 1,
          is_active: true
        },
        {
          post_id: 2,
          album_id: 1,
          is_active: true
        },
        {
          post_id: 3,
          album_id: 1,
          is_active: true
        },
        {
          post_id: 4,
          album_id: 2,
          is_active: true
        },
        {
          post_id: 5,
          album_id: 2,
          is_active: true
        },
        {
          post_id: 6,
          album_id: 2,
          is_active: true
        },
        {
          post_id: 7,
          album_id: 3,
          is_active: true
        },
        {
          post_id: 8,
          album_id: 3,
          is_active: true
        },
        {
          post_id: 9,
          album_id: 4,
          is_active: true
        },
        {
          post_id: 10,
          album_id: 5,
          is_active: true
        },
        {
          post_id: 11,
          album_id: 6,
          is_active: true
        },
        {
          post_id: 12,
          album_id: 7,
          is_active: true
        },
        {
          post_id: 13,
          album_id: 8,
          is_active: true
        },
        {
          post_id: 14,
          album_id: 9,
          is_active: true
        },
        {
          post_id: 15,
          album_id: 10,
          is_active: true
        }
      ]);
    });
};

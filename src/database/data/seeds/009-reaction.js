exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reaction').del()
    .then(function () {
      // Inserts seed entries
      return knex('reaction').insert([
        {
          user_id: 30,
          reaction_type_id: 1,
          post_id: 1,
          is_active: true
        },
        {
          user_id: 30,
          reaction_type_id: 1,
          post_id: 1,
          is_active: true
        },
        {
          user_id: 30,
          reaction_type_id: 1,
          post_id: 2,
          is_active: true
        },
        {
          user_id: 29,
          reaction_type_id: 2,
          post_id: 2,
          is_active: true
        },
        {
          user_id: 29,
          reaction_type_id: 2,
          post_id: 3,
          is_active: true
        },
        {
          user_id: 29,
          reaction_type_id: 2,
          post_id: 3,
          is_active: true
        },
        {
          user_id: 28,
          reaction_type_id: 1,
          post_id: 4,
          is_active: true
        },
        {
          user_id: 28,
          reaction_type_id: 1,
          post_id: 4,
          is_active: true
        },
        {
          user_id: 27,
          reaction_type_id: 4,
          post_id: 4,
          is_active: true
        },
        {
          user_id: 26,
          reaction_type_id: 6,
          post_id: 17,
          is_active: true
        },
        {
          user_id: 25,
          reaction_type_id: 1,
          post_id: 11,
          is_active: true
        },
        {
          user_id: 24,
          reaction_type_id: 2,
          post_id: 12,
          is_active: true
        },
        {
          user_id: 23,
          reaction_type_id: 1,
          post_id: 17,
          is_active: true
        },
        {
          user_id: 22,
          reaction_type_id: 2,
          post_id: 16,
          is_active: true
        },
        {
          user_id: 21,
          reaction_type_id: 6,
          post_id: 17,
          is_active: true
        }
      ]);
    });
};

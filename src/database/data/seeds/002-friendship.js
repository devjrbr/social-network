exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friendship').del()
    .then(function () {
      // Inserts seed entries
      return knex('friendship').insert([
        {
          principal_user_id: 1,
          friend_id: 30,
          is_active: true
        },
        {
          principal_user_id: 1,
          friend_id: 29,
          is_active: true
        },
        {
          principal_user_id: 1,
          friend_id: 28,
          is_active: true
        },
        {
          principal_user_id: 4,
          friend_id: 27,
          is_active: true
        },
        {
          principal_user_id: 5,
          friend_id: 26,
          is_active: true
        },
        {
          principal_user_id: 6,
          friend_id: 25,
          is_active: true
        },
        {
          principal_user_id: 7,
          friend_id: 24,
          is_active: true
        },
        {
          principal_user_id: 8,
          friend_id: 23,
          is_active: true
        },
        {
          principal_user_id: 9,
          friend_id: 22,
          is_active: true
        },
        {
          principal_user_id: 10,
          friend_id: 21,
          is_active: true
        },
        {
          principal_user_id: 11,
          friend_id: 20,
          is_active: true
        },
        {
          principal_user_id: 12,
          friend_id: 19,
          is_active: true
        },
      ]);
    });
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {
          description: "Queria estar aí!!",
          user_id: 6,
          post_id: 1,
          is_active: true
        },
        {
          description: "Essa montanha russa é braba",
          user_id: 5,
          post_id: 2,
          is_active: true
        },
        {
          description: "Já teve vários acidentes com jacaré aí",
          user_id: 4,
          post_id: 3,
          is_active: true
        },
        {
          description: "Uma das águas mais lindas do mundo",
          user_id: 8,
          post_id: 5,
          is_active: true
        },
        {
          description: "Foco sempre irmão",
          user_id: 7,
          post_id: 6,
          is_active: true
        },
        {
          description: "O melhor bolo!",
          user_id: 28,
          post_id: 7,
          is_active: true
        },
        {
          description: "Brigadeiro é a melhor coisa",
          user_id: 27,
          post_id: 9,
          is_active: true
        },
        {
          description: "Essa praia é muito suja",
          user_id: 26,
          post_id: 10,
          is_active: true
        },
        {
          description: "Legal essas dicas de foto",
          user_id: 25,
          post_id: 11,
          is_active: true
        },
        {
          description: "Parabéns pela conquista!",
          user_id: 24,
          post_id: 12,
          is_active: true
        },
        {
          description: "Banda dhr demais",
          user_id: 22,
          post_id: 16,
          is_active: true
        },
        {
          description: "Comprei um ar condicionado",
          user_id: 21,
          post_id: 17,
          is_active: true
        }
      ]);
    });
};

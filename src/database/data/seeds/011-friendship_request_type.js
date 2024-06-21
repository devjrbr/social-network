exports.seed = function (knex) {
    return knex('friendship_request_type').del()
        .then(function () {
            return knex('friendship_request_type').insert([
                {
                    type: 'Awaiting approval'
                },
                {
                    type: 'Accepted'
                },
                {
                    type: 'Denied'
                }
            ]);
        });
};

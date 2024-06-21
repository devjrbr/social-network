const yup = require('yup');

const createFriendshipRequestTypeSchema = yup.object({
    type: yup.string().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    createFriendshipRequestTypeSchema,
    getByIdSchema
};

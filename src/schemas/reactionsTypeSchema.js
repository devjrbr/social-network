const yup = require('yup');

const createReactionTypeSchema = yup.object({
    description: yup.string().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    createReactionTypeSchema,
    getByIdSchema
};

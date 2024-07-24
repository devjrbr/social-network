const yup = require('yup');

const createReactionsSchema = yup.object({
    authorization: yup.string().required(),
    reaction_type_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
});

const updateReactionsSchemaAuthorization = yup.object().shape({
    id: yup.number().integer().required(),
    authorization: yup.string().required()
});

module.exports = {
    createReactionsSchema,
    updateReactionsSchemaAuthorization,
    getByIdSchema,
    authorizationSchema
};

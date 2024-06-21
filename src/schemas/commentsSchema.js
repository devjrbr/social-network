const yup = require('yup');

const createCommentSchema = yup.object({
    authorization: yup.string().required(),
    description: yup.string().required(),
    user_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const updateCommentSchema = yup.object({
    id: yup.number().integer().required(),
    description: yup.string().required(),
    user_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
});

module.exports = {
    createCommentSchema,
    updateCommentSchema,
    getByIdSchema,
    authorizationSchema
};
const yup = require('yup');

const createCommentSchema = yup.object({
    description: yup.string().required(),
    post_id: yup.number().integer().required()
});

const updateCommentSchema = yup.object({
    id: yup.number().integer().required(),
    description: yup.string().required(),
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required(),
    authorization: yup.string().required(),
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

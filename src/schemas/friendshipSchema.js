const yup = require('yup');

const getByIdSchema = yup.object({
    authorization: yup.string().required(),
    id: yup.number().integer().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
});

module.exports = {
    getByIdSchema,
    authorizationSchema
};

const yup = require('yup');

const createUserSchema = yup.object().shape({
    full_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
});

const updateUserSchema = yup.object().shape({
    id: yup.number().integer(),
    full_name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
});
const getByIdSchema = yup.object().shape({
    id: yup.number().integer().required(),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getByIdSchema,
    authorizationSchema
};
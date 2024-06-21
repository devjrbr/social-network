const yup = require('yup');

const createFileTypeSchema = yup.object({
    type: yup.string().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});


module.exports = {
    createFileTypeSchema,
    getByIdSchema
};

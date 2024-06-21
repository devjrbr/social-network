const yup = require('yup');

const createAlbumSchema = yup.object({
    description: yup.string().required(),
    targetId: yup.number().integer().required()
});

const updateAlbumSchema = yup.object({
    albumId: yup.number().integer().required(),
    description: yup.string().required(),
    targetId: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    albumId: yup.number().integer().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
}); 

module.exports = {
    createAlbumSchema,
    updateAlbumSchema,
    getByIdSchema,
    authorizationSchema
};

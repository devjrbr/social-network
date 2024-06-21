const yup = require('yup');

const createAlbumItemSchema = yup.object({
    authorization: yup.string().required(),
    post_id: yup.number().integer().required(),
    album_id: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    authorization: yup.string().required(),
    id: yup.number().integer().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
});

module.exports = {
    createAlbumItemSchema,
    getByIdSchema,
    authorizationSchema
};

const express = require('express');
const validateSchema = require("../middlewares/albumItemValidation");
const { createAlbumItemSchema, getByIdSchema, authorizationSchema } = require("../schemas/albumItemSchema");

function createAlbumItemRoutes(albumItemController) {
    const router = express.Router();
    router.post('/', validateSchema(createAlbumItemSchema), albumItemController.createAlbumItem.bind(albumItemController));
    router.get('/', validateSchema(authorizationSchema),  albumItemController.getAlbumItems.bind(albumItemController));
    router.delete('/:id', validateSchema(getByIdSchema), albumItemController.deleteAlbumItem.bind(albumItemController));
    return router
}

module.exports = createAlbumItemRoutes;

const express = require('express');
const validateSchema = require('../middlewares/friendshipRequestTypeValidation');
const { createFriendshipRequestTypeSchema, getByIdSchema } = require('../schemas/friendshipRequestTypeSchema');

function createFriendshipRequestTypeRoutes(friendshipRequestTypeController) {
    const router = express.Router();
    router.post('/', validateSchema(createFriendshipRequestTypeSchema) ,friendshipRequestTypeController.create.bind(friendshipRequestTypeController));
    router.get('/', friendshipRequestTypeController.getAll.bind(friendshipRequestTypeController));
    router.get('/:id', validateSchema(getByIdSchema), friendshipRequestTypeController.getById.bind(friendshipRequestTypeController));
    router.delete('/:id', validateSchema(getByIdSchema), friendshipRequestTypeController.delete.bind(friendshipRequestTypeController));
    return router
}

module.exports = createFriendshipRequestTypeRoutes;
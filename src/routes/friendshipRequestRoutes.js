const express = require('express');
const validateSchema = require('../middlewares/friendshipRequestValidation');
const { createFriendshipRequestSchema,
    seeAllFriendshipRequestsSchema,
    acceptFriendshipRequestSchema,
    rejectFriendshipRequestSchema } = require('../schemas/friendshipRequestSchema');

function createFriendshipRequestRoutes(friendshipRequestController) {
    const router = express.Router();
    router.post('/', validateSchema(createFriendshipRequestSchema), friendshipRequestController.sendFriendshipRequest.bind(friendshipRequestController));
    router.get('/', validateSchema(seeAllFriendshipRequestsSchema), friendshipRequestController.getAllFriendshipRequests.bind(friendshipRequestController));
    router.put('/:id', validateSchema(acceptFriendshipRequestSchema), friendshipRequestController.acceptFriendshipRequest.bind(friendshipRequestController));
    router.delete('/:id', validateSchema(rejectFriendshipRequestSchema), friendshipRequestController.rejectFriendshipRequest.bind(friendshipRequestController));
    return router
}

module.exports = createFriendshipRequestRoutes;

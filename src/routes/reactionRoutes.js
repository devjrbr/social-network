const express = require('express');
const validateSchema  = require('../middlewares/reactionValidation');
const { createReactionsSchema, getByIdSchema, authorizationSchema, updateReactionsSchemaAuthorization} = require('../schemas/reactionsSchema');

function createReactionRoutes(reactionController) {
    const router = express.Router();
    router.get('/', validateSchema(authorizationSchema), reactionController.getReactions.bind(reactionController));
    router.post('/', validateSchema(createReactionsSchema), reactionController.createReaction.bind(reactionController));
    router.get('/:id', validateSchema(authorizationSchema), reactionController.getReactionById.bind(reactionController));
    router.put('/:id', validateSchema(updateReactionsSchemaAuthorization), reactionController.updateReaction.bind(reactionController));
    router.delete('/:id', validateSchema(getByIdSchema), reactionController.deleteReaction.bind(reactionController));
    return router
}

module.exports = createReactionRoutes;

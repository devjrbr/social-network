const express = require('express');
const validateSchema = require("../middlewares/reactionsTypeValidation");
const { createReactionTypeSchema } = require("../schemas/reactionsTypeSchema");

function createReactionTypeRoutes(reactionTypeController) {
    const router = express.Router();
    router.post('/', validateSchema(createReactionTypeSchema), reactionTypeController.createReactionType.bind(reactionTypeController));
    router.get('/', reactionTypeController.getReactionsType.bind(reactionTypeController));
    router.delete('/:id', reactionTypeController.deleteReactionType.bind(reactionTypeController));
    return router
}

module.exports = createReactionTypeRoutes;

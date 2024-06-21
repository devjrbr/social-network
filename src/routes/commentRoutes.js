const express = require('express');
const validateSchema  = require('../middlewares/commentsValidation');
const {createCommentSchema, updateCommentSchema, getByIdSchema, authorizationSchema} = require('../schemas/commentsSchema');

function createCommentRoutes(commentController) {
    const router = express.Router();
    router.post('/', validateSchema(createCommentSchema), commentController.create.bind(commentController));
    router.get('/', validateSchema(authorizationSchema), commentController.getCommentsByPostId.bind(commentController));
    router.get('/:id', validateSchema(getByIdSchema), commentController.getCommentById.bind(commentController));
    router.put('/:id', validateSchema(updateCommentSchema), commentController.updateComment.bind(commentController));
    router.delete('/:id', validateSchema(getByIdSchema), commentController.deleteComment.bind(commentController));
    return router
}

module.exports = createCommentRoutes;

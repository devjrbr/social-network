const express = require('express');
const PostController = require('../controller/postController');
const validateSchema  = require('../middlewares/postValidation');
const {createPostSchema, updatePostSchema, getByIdSchema, authorizationSchema} = require('../schemas/postSchema')

function createPostRoutes(postController) {
    const router = express.Router();
    router.post('/', validateSchema(createPostSchema), postController.createPost.bind(postController));
    router.get('/', validateSchema(authorizationSchema), postController.getPosts.bind(postController));
    router.get('/:id', validateSchema(getByIdSchema), postController.getPostById.bind(postController));
    router.put('/:id', validateSchema(updatePostSchema), postController.updatePost.bind(postController));
    router.delete('/:id', validateSchema(getByIdSchema), postController.deletePost.bind(postController));
    return router
}

module.exports = createPostRoutes;

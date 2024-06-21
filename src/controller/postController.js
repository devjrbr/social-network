const httpStatus = require('../utils/statusCodes');

class PostController {
    constructor(postService, tokenService) {
        this.postService = postService;
        this.tokenService = tokenService;
    }
    async createPost(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const { description, target_id, type_id } = req.body;
        const post = await this.postService.createPost(description, userId, target_id, type_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Post created successfully!',
            data: post
        });
    }
    async getPostById(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const post = await this.postService.getPostById(id);
        return res.status(httpStatus.OK).json(post);
    }
    async getPosts(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const posts = await this.postService.getAllPosts(userId);
        return res.status(httpStatus.OK).json(posts);
    }
    async updatePost(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const { description, target_id, type_id } = req.body;
        await this.postService.updatePost(id, description, target_id, type_id);
        return res.status(httpStatus.OK).json({
            details: "Post updated successfully"
        });
    }
    async deletePost(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.postService.deletePost(id);
        return res.status(httpStatus.OK).json({
            details: "Post deleted successfully"
        });
    }
}

module.exports = PostController;

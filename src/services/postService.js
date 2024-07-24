const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    };
    createPost(description, userId, targetId, typeId) {
        return this.postRepository.create(description, userId, targetId, typeId);
    };
    async getPostById(id) {
        const post = await this.postRepository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return post;
    };
    getAllPosts(userId) {
        return this.postRepository.getAll(userId);
    };
    async updatePost(postId, description, targetId, typeId) {
        const post = await this.postRepository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found.');
        return this.postRepository.update(postId, description, targetId, typeId);
    };
    async deletePost(postId) {
        const post = await this.postRepository.getById(postId);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found.');
        await this.postRepository.delete(postId);
    };
}

module.exports = PostService;

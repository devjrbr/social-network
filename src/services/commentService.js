const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    };
    create(description, userId, postId) {
        return this.commentRepository.create(description, userId, postId);
    };
    async getCommentById(commentId) {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        return comment;
    };
    getAllComments(commentId) {
        return this.commentRepository.getAll(commentId);
    };
    async updateComment(commentId, description, userId, postId) {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        await this.commentRepository.update(commentId, description, userId, postId);
    };
    async deleteComment(commentId) {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        await this.commentRepository.delete(commentId);
    };
}

module.exports = CommentService;

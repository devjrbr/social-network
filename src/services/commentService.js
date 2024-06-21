const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async create(description, user_id, post_id) {
        return this.commentRepository.create(description, user_id, post_id);
    };
    async getCommentById(id) {
        const comment = await this.commentRepository.getById(id);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        return comment;
    };
    async getAllComments(commentId) {
        return this.commentRepository.getAll(commentId);
    };
    async updateComment(id, description, user_id, post_id) {
        const comment = await this.commentRepository.getById(id);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        await this.commentRepository.update(id, description, user_id, post_id);
    };
    async deleteComment(id) {
        const comment = await this.commentRepository.getById(id);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        await this.commentRepository.delete(id);
    };
}

module.exports = CommentService;

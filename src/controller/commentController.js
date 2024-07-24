const httpStatus = require('../utils/statusCodes');

class CommentController {
    constructor(commentService,  tokenService) {
        this.commentService = commentService;
        this.tokenService = tokenService;
    }
    async create(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { description, user_id: userId, post_id: postId } = req.body;
        const comment = await this.commentService.create(description, userId, postId);
        return res.status(httpStatus.CREATED).json({
            message: 'Comment created successfully!',
            data: comment
        });
    }
    async getCommentById(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const comment = await this.commentService.getCommentById(id);
        return res.status(httpStatus.OK).json(comment);
    }
    async getCommentsByPostId(req, res) {
        const { authorization: token } = req.headers;
        const commentId = await this.tokenService.getIdFromToken(token);
        const comments = await this.commentService.getAllComments(commentId);
        return res.status(httpStatus.OK).json(comments);
    }
    async updateComment(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const { description, user_id: userId, post_id: postId } = req.body;
        await this.commentService.updateComment(id, description, userId, postId);
        return res.status(httpStatus.OK).json({
            details: "Comment updated successfully"
        });
    }
    async deleteComment(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.commentService.deleteComment(id);
        return res.status(httpStatus.OK).json({
            details: "Comment deleted successfully"
        });
    }
}

module.exports = CommentController;

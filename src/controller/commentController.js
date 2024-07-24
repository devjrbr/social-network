const httpStatus = require('../utils/statusCodes');

class CommentController {
    constructor(commentService,  tokenService) {
        this.commentService = commentService;
        this.tokenService = tokenService;
    }
    async create(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const { description, post_id: postId } = req.body;
        const comment = await this.commentService.create(description, userId, postId);
        return res.status(httpStatus.CREATED).json({
            message: 'Comment created successfully!',
            data: comment
        });
    }
    async getCommentById(req, res) {
        const { id: commentId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const comment = await this.commentService.getCommentById(commentId);
        return res.status(httpStatus.OK).json(comment);
    }
    async getCommentsByPostId(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const comments = await this.commentService.getAllComments(userId);
        return res.status(httpStatus.OK).json(comments);
    };
    async updateComment(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id: commentId } = req.params;
        const { description} = req.body;
        await this.commentService.updateComment(commentId, description);
        return res.status(httpStatus.OK).json({
            details: "Comment updated successfully"
        });
    };
    async deleteComment(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id: commentId } = req.params;
        await this.commentService.deleteComment(commentId);
        return res.status(httpStatus.OK).json({
            details: "Comment deleted successfully"
        });
    };
}

module.exports = CommentController;

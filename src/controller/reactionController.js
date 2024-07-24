const httpStatus = require('../utils/statusCodes');

class ReactionController {
    constructor(reactionService, tokenService) {
        this.reactionService = reactionService;
        this.tokenService = tokenService;
    }
    async createReaction(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const { reaction_type_id: reactionTypeId, post_id: postId } = req.body;
        const reaction = await this.reactionService.createReaction(userId, reactionTypeId, postId);
        return res.status(httpStatus.CREATED).json({
            message: 'Reaction created successfully!',
            data: reaction
        });
    }
    async getReactionById(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const reaction = await this.reactionService.getReactionById(id);
        return res.status(httpStatus.OK).json(reaction);
    }
    async getReactions(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const reactions = await this.reactionService.getAllReactions(userId);
        return res.status(httpStatus.OK).json(reactions);
    }
    async updateReaction(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const { user_id: userId, reaction_type_id: reactionTypeId, post_id: postId } = req.body;
        await this.reactionService.updateReaction(id, userId, reactionTypeId, postId);
        return res.status(httpStatus.OK).json({
            details: "Reaction updated successfully"
        });
    }
    async deleteReaction(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.reactionService.deleteReaction(id);
        return res.status(httpStatus.OK).json({
            details: "Reaction deleted successfully"
        });
    }
}

module.exports = ReactionController;

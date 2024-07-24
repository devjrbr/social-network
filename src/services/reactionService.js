const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionService {
    constructor(reactionRepository) {
        this.reactionRepository = reactionRepository;
    };
    createReaction(userId, reactionTypeId, postId) {
        return this.reactionRepository.create(userId, reactionTypeId, postId);
    };
    async getReactionById(id) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return reaction;
    };
    getAllReactions(userId) {
        return this.reactionRepository.getAll(userId);
    };
    async updateReaction(id, userId, reactionId, postId) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return this.reactionRepository.update(id, userId, reactionId, postId);
    };
    async deleteReaction(reactionId) {
        const reaction = await this.reactionRepository.getById(reactionId);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        await this.reactionRepository.delete(reactionId);
    };
}

module.exports = ReactionService;

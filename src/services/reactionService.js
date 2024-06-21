const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionService {
    constructor(reactionRepository) {
        this.reactionRepository = reactionRepository;
    }
    async createReaction(userId, reaction_type_id, post_id) {
        return this.reactionRepository.create(userId, reaction_type_id, post_id);
    };
    async getReactionById(id) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return reaction;
    };
    async getAllReactions(userId) {
        return this.reactionRepository.getAll(userId);
    };
    async updateReaction(id, user_id, reaction_type_id, post_id) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        return this.reactionRepository.update(id, user_id, reaction_type_id, post_id);
    };
    async deleteReaction(id) {
        const reaction = await this.reactionRepository.getById(id);
        if (!reaction) throw new ApiError(httpStatus.NOT_FOUND,'Reaction not found');
        await this.reactionRepository.delete(id);
    };
}

module.exports = ReactionService;

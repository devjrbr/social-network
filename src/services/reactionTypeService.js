const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class ReactionTypeService {
    constructor(reactionTypeRepository) {
        this.reactionTypeRepository = reactionTypeRepository;
    }
    async createReactionType(description) {
        return this.reactionTypeRepository.create(description);
    };
    async getAllReactionsType() {
        return this.reactionTypeRepository.getAll();
    };
    async deleteReactionType(id) {
        const reactionsType = await this.reactionTypeRepository.getById(id);
        if (!reactionsType) throw new ApiError(httpStatus.NOT_FOUND, 'Reaction type not found');
        await this.reactionTypeRepository.delete(id);
    };
}

module.exports = ReactionTypeService;

const { assertIsInstanceOfContract } = require("./interfaces/validation");

class ReactionRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    create(userId, reactionTypeId, postId) {
        return this.repository.create(userId, reactionTypeId, postId);
    };
    getById(reactionId){
        return this.repository.getById(reactionId);
    };
    getAll(userId){
        return this.repository.getAll(userId);
    };
    update(reactionId, userId, reactionTypeId, postId) {
        this.repository.update(reactionId, userId, reactionTypeId, postId);
    };
    delete (reactionId) {
        this.repository.delete(reactionId);
    };
}

module.exports = ReactionRepository;

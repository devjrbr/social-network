const { assertIsInstanceOfContract } = require("./interfaces/validation");

class ReactionTypeRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    create(reactionTypeDescription) {
        return this.repository.create(reactionTypeDescription);
    };
    getById(reactionTypeId){
        return this.repository.getById(reactionTypeId);
    };
    getAll(){
        return this.repository.getAll();
    };
    delete (reactionTypeId) {
        return this.repository.delete(reactionTypeId);
    };
}

module.exports = ReactionTypeRepository;

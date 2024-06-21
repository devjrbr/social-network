const { assertIsInstanceOfContract } = require("./interfaces/validation");

class ReactionTypeRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(description) {
        return this.repository.create(description);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async delete (id) {
        return this.repository.delete(id);
    };
}

module.exports = ReactionTypeRepository;

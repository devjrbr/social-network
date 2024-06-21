const { assertIsInstanceOfContract } = require("./interfaces/validation");

class TargetPublicRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(type) {
        return this.repository.create(type);
    };
    async getAll(){
        return this.repository.getAll()
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async delete(id) {
        return this.repository.delete(id);
    };
}

module.exports = TargetPublicRepository;

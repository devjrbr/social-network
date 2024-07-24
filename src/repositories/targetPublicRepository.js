const { assertIsInstanceOfContract } = require("./interfaces/validation");

class TargetPublicRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    create(type) {
        return this.repository.create(type);
    };
    getAll(){
        return this.repository.getAll()
    };
    getById(targetPublicId){
        return this.repository.getById(targetPublicId);
    };
    delete(targetPublicId) {
        return this.repository.delete(targetPublicId);
    };
}

module.exports = TargetPublicRepository;

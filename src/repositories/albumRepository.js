const { assertIsInstanceOfContract } = require("./interfaces/validation");

class AlbumRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(description, targetId) {
        return this.repository.create(description, targetId);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(albumId){
        return this.repository.getAll(albumId);
    };
    async update(id, description, target_id) {
        this.repository.update(id, description, target_id);
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = AlbumRepository;

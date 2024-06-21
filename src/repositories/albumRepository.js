const { assertIsInstanceOfContract } = require("./interfaces/validation");

class AlbumRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(description, targetId) {
        return this.repository.create(description, targetId);
    };
    async getById(albumId){
        return this.repository.getById(albumId);
    };
    async getAll(albumId){
        return this.repository.getAll(albumId);
    };
    async update(albumId, description, targetId) {
        this.repository.update(albumId, description, targetId);
    };
    async delete (albumId) {
        this.repository.delete(albumId);
    };
}

module.exports = AlbumRepository;

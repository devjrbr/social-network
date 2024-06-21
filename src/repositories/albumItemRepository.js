const { assertIsInstanceOfContract } = require("./interfaces/validation");

class AlbumItemRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(postId, albumItemId) {
        return this.repository.create(postId, albumItemId);
    };
    async getById(albumItemId){
        return this.repository.getById(albumItemId);
    };
    async getAll(albumItemId){
        return this.repository.getAll(albumItemId);
    };
    async delete (albumItemId) {
        this.repository.delete(albumItemId);
    };
}

module.exports = AlbumItemRepository;

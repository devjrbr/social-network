const { assertIsInstanceOfContract } = require("./interfaces/validation");

class AlbumItemRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(post_id, album_id) {
        return this.repository.create(post_id, album_id);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(AlbumId){
        return this.repository.getAll(AlbumId);
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = AlbumItemRepository;

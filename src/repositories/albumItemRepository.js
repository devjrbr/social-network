const { assertIsInstanceOfContract } = require("./interfaces/validation");

class AlbumItemRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(postId, albumItemId) {
        return this.repository.create(postId, albumItemId);
    };
    getById(albumItemId){
        return this.repository.getById(albumItemId);
    };
    getAll(albumItemId){
        return this.repository.getAll(albumItemId);
    };
    delete (albumItemId) {
        this.repository.delete(albumItemId);
    };
}

module.exports = AlbumItemRepository;

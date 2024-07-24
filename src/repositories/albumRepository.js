const { assertIsInstanceOfContract } = require("./interfaces/validation");

class AlbumRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(description, targetId) {
        return this.repository.create(description, targetId);
    };
    getById(albumId){
        return this.repository.getById(albumId);
    };
    getAll(albumId){
        return this.repository.getAll(albumId);
    };
    update(albumId, description, targetId) {
        this.repository.update(albumId, description, targetId);
    };
    delete (albumId) {
        this.repository.delete(albumId);
    };
}

module.exports = AlbumRepository;

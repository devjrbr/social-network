const { assertIsInstanceOfContract } = require("./interfaces/validation");

class PostRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(description, userId, targetId, typeId) {
        return this.repository.create(description, userId, targetId, typeId);
    };
    getById(postId){
        return this.repository.getById(postId);
    };
    getAll(userId){
        return this.repository.getAll(userId);
    };
    update(postId, description, userId, targetId, typeId) {
        this.repository.update(postId, description, userId, targetId, typeId);
    };
    delete (postId) {
        this.repository.delete(postId);
    };
}

module.exports = PostRepository;

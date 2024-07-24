const { assertIsInstanceOfContract } = require("./interfaces/validation");

class CommentRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(description, userId, postId) {
        return this.repository.create(description, userId, postId);
    };
    getById(postId){
        return this.repository.getById(postId);
    };
    getAll(commentId){
        return this.repository.getAll(commentId);
    };
    update(id, description, userId, postId) {
        this.repository.update(id, description, userId, postId);
    };
    delete (commentId) {
        this.repository.delete(commentId);
    };
}

module.exports = CommentRepository;

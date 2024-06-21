const { assertIsInstanceOfContract } = require("./interfaces/validation");

class CommentRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(description, user_id, post_id) {
        return this.repository.create(description, user_id, post_id);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async getAll(commentId){
        return this.repository.getAll(commentId);
    };
    async update(id, description, user_id, post_id) {
        this.repository.update(id, description, user_id, post_id);
    };
    async delete (id) {
        this.repository.delete(id);
    };
}

module.exports = CommentRepository;

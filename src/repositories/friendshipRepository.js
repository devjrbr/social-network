const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FriendshipRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(principal_user_id, friend_id) {
        return this.repository.create(principal_user_id, friend_id);
    };
    async getAll(userId){
        return this.repository.getAll(userId);
    };
    async getById(id){
        return this.repository.getById(id);
    };
    async delete(id){
        this.repository.delete(id);
    };
}

module.exports = FriendshipRepository;

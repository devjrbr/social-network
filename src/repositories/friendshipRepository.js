const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FriendshipRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(principalUserId, friendId) {
        return this.repository.create(principalUserId, friendId);
    };
    getAll(userId){
        return this.repository.getAll(userId);
    };
    getById(userId){
        return this.repository.getById(userId);
    };
    delete(userId){
        this.repository.delete(userId);
    };
}

module.exports = FriendshipRepository;

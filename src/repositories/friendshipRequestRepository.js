const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FriendshipRequestRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(senderId, receiverId) {
        return this.repository.create(senderId, receiverId);
    };
    getAll(userId) {
        return this.repository.getAll(userId);
    };
    accept(requestId) {
        return this.repository.accept(requestId);
    };
    delete(requestId) {
        return this.repository.delete(requestId);
    };
}

module.exports = FriendshipRequestRepository;

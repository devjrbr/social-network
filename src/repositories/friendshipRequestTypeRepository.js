const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FriendshipRequestTypeRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(newFriendshipRequestType) {
        return this.repository.create(newFriendshipRequestType);
    };
    getAll(){
        return this.repository.getAll();
    };
    getById(friendshipRequestId){
        return this.repository.getById(friendshipRequestId);
    };
    delete(friendshipRequestId){
        return this.repository.delete(friendshipRequestId);
    };
}

module.exports = FriendshipRequestTypeRepository;
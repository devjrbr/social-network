const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FriendshipRequestRepository {
  constructor(repository, contract) {
      assertIsInstanceOfContract(repository, contract);
      this.repository = repository;
  }
  async create(senderId, receiveId) {
      return this.repository.create(senderId, receiveId);
  }
  async getAll(userId) {
    return this.repository.getAll(userId);
  }
  async accept(requestId) {
      return this.repository.accept(requestId);
  }
  async delete(requestId) {
      return this.repository.delete(requestId);
  }
}

module.exports = FriendshipRequestRepository;

class FriendshipRequestService {
    constructor(friendshipRequestRepository) {
        this.friendshipRequestRepository = friendshipRequestRepository;
    }
    async sendFriendshipRequest(senderId, receiverId) {
        return this.friendshipRequestRepository.create(senderId, receiverId);
    }
    async getAllFriendshipRequests(userId) {
        return this.friendshipRequestRepository.getAll(userId);
    }
    async acceptFriendshipRequest(requestId) {
        this.friendshipRequestRepository.accept(requestId);
    }
    async rejectFriendshipRequest(requestId) {
        return this.friendshipRequestRepository.delete(requestId);
    }
}

module.exports = FriendshipRequestService;

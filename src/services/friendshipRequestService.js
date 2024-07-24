class FriendshipRequestService {
    constructor(friendshipRequestRepository) {
        this.friendshipRequestRepository = friendshipRequestRepository;
    };
     sendFriendshipRequest(senderId, receiverId) {
        return this.friendshipRequestRepository.create(senderId, receiverId);
    };
     getAllFriendshipRequests(userId) {
        return this.friendshipRequestRepository.getAll(userId);
    };
    acceptFriendshipRequest(requestId) {
        this.friendshipRequestRepository.accept(requestId);
    };
     rejectFriendshipRequest(requestId) {
        return this.friendshipRequestRepository.delete(requestId);
    };
}

module.exports = FriendshipRequestService;

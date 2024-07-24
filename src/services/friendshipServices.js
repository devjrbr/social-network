const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FriendshipService {
    constructor(friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    };
    create(principalUserId, friendId) {
        return this.friendshipRepository.create(principalUserId, friendId);
    };
    getAllFriendships(userId) {
        return this.friendshipRepository.getAll(userId);
    };
    async getById(friendshipId){
        const friendship = await this.friendshipRepository.getById(friendshipId);
        if (!friendship) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship not found.');
        return friendship;
    };
    async deleteFriendship(friendshipId) {
        const friendship = await this.friendshipRepository.getById(friendshipId);
        if (!friendship) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship not found.');
        await this.friendshipRepository.delete(friendshipId);
    };
}

module.exports = FriendshipService;

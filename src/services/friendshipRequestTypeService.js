const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FriendshipRequestTypeService {
    constructor(friendshipRequestTypeRepository) {
        this.friendshipRequestTypeRepository = friendshipRequestTypeRepository;
    };
    create(newFriendshipRequestType) {
        return this.friendshipRequestTypeRepository.create(newFriendshipRequestType);
    };
    getAll(){
        return this.friendshipRequestTypeRepository.getAll();
    };
    async getById(friendshipRequestTypeId){
        const friendshipRequestType = await this.friendshipRequestTypeRepository.getById(friendshipRequestTypeId);
        if (!friendshipRequestType) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship request type not found.');
        return friendshipRequestType;
    };
    async delete(friendshipRequestTypeId){
        const friendshipRequestType = await this.friendshipRequestTypeRepository.getById(friendshipRequestTypeId);
        if(!friendshipRequestType) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship request type not found.')
        return this.friendshipRequestTypeRepository.delete(friendshipRequestTypeId);
    };
}

module.exports = FriendshipRequestTypeService;

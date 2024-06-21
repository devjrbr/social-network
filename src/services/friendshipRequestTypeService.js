const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class FriendshipRequestTypeService {
    constructor(friendshipRequestTypeRepository) {
        this.friendshipRequestTypeRepository = friendshipRequestTypeRepository;
    }
    async create(type) {
        return this.friendshipRequestTypeRepository.create(type);
    }
    async getAll(){
        return this.friendshipRequestTypeRepository.getAll();
    }
    async getById(id){
        const friendshipRequestType = await this.friendshipRequestTypeRepository.getById(id);
        if (!friendshipRequestType) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship request type not found.');
        return friendshipRequestType;
    }
    async delete(id){
        await this.getById(id);
        return this.friendshipRequestTypeRepository.delete(id);
    }
}

module.exports = FriendshipRequestTypeService;
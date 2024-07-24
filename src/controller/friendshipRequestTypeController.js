const httpStatus = require('../utils/statusCodes');

class FriendshipRequestTypeController {
    constructor(friendshipRequestTypeService) {
        this.friendshipRequestTypeService = friendshipRequestTypeService;
    };
    async create(req, res) {
        const { type } = req.body;
        const friendshipRequestType = await this.friendshipRequestTypeService.create(type);
        return res.status(httpStatus.CREATED).json({
            message: 'Friendship request type created successfully!',
            data: friendshipRequestType
        });
    }
    async getAll(req, res) {
        const friendshipRequestType = await this.friendshipRequestTypeService.getAll();
        return res.status(httpStatus.OK).json(friendshipRequestType);
    }
    async getById(req, res) {
        const { id } = req.params;
        const friendshipRequestType = await this.friendshipRequestTypeService.getById(id);
        return res.status(httpStatus.OK).json(friendshipRequestType);
    }
    async delete(req, res) {
        const { id } = req.params;
        await this.friendshipRequestTypeService.delete(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship request type deleted successfully"
        });
    }
}

module.exports = FriendshipRequestTypeController;
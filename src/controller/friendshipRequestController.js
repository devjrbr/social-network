const httpStatus = require("../utils/statusCodes");

class FriendshipRequestController {
    constructor(friendshipRequestService, tokenService, friendshipService) {
        this.friendshipRequestService = friendshipRequestService;
        this.tokenService = tokenService;
        this.friendshipService = friendshipService;
    };
    async sendFriendshipRequest(req, res) {
        const { authorization: token } = req.headers;
        const senderID = await this.tokenService.getIdFromToken(token);
        const { receiver_id: receiverId } = req.body;
        await this.friendshipRequestService.sendFriendshipRequest(senderID, receiverId);
        return res.status(httpStatus.CREATED).json({
            message: 'Friendship request sent successfully!'
        });
    }
    async getAllFriendshipRequests(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const friendshipRequests = await this.friendshipRequestService.getAllFriendshipRequests(userId);
        return res.status(httpStatus.OK).json(friendshipRequests);
    }
    async acceptFriendshipRequest(req, res) {
        const { authorization: token } = req.headers;
        const receiverId = await this.tokenService.getIdFromToken(token);
        const { id: requestId } = req.params;
        const { sender_id: senderId } = req.body;
        await this.friendshipRequestService.acceptFriendshipRequest(requestId);
        this.friendshipService.create(senderId, receiverId);
        return res.status(httpStatus.OK).json({
            message: 'Friendship request accepted successfully!'
        });
    }
    async rejectFriendshipRequest(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id: requestId } = req.params;
        await this.friendshipRequestService.rejectFriendshipRequest(requestId);
        return res.status(httpStatus.OK).json({
            message: 'Friendship request rejected successfully!'
        });
    }
}

module.exports = FriendshipRequestController;

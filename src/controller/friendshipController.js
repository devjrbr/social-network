const httpStatus = require('../utils/statusCodes');

class FriendshipController {
    constructor(friendshipService, tokenService) {
        this.friendshipService = friendshipService;
        this.tokenService = tokenService;
    }
    async getFriendships(req, res) {
        const { authorization: token } = req.headers;
        const userId =  await this.tokenService.getIdFromToken(token);
        const friendship = await this.friendshipService.getAllFriendships(userId);
        return res.status(httpStatus.OK).json(friendship);
    };
    async getById(req, res){
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const friendship = await this.friendshipService.getById(id);
        return res.status(httpStatus.OK).json(friendship);
    };
    async deleteFriendship(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.friendshipService.deleteFriendship(id);
        return res.status(httpStatus.OK).json({
            details: "Friendship deleted successfully"
        });
    };
}

module.exports = FriendshipController;

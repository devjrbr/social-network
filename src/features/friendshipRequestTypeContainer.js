const FriendshipRequestTypeRepositoryImplementation = require("../repositories/implementation/friendshipRequestTypeRepository");
const FriendshipRequestTypeRepository = require("../repositories/friendshipRequestTypeRepository");
const FriendshipRequestTypeService = require("../services/friendshipRequestTypeService");
const FriendshipRequestTypeController = require("../controller/friendshipRequestTypeController");
const createFriendshipRequestTypeRoutes = require("../routes/friendshipRequestTypeRoutes");
const { IFriendshipRequestTypeRepository } = require("../repositories/interfaces/friendshipRequestTypeAbstract");

function configureFriendshipRequestTypeContainer() {
    const friendshipRequestTypeRepositoryImplementation = new FriendshipRequestTypeRepositoryImplementation();
    const friendshipRequestTypeRepository = new FriendshipRequestTypeRepository(friendshipRequestTypeRepositoryImplementation, IFriendshipRequestTypeRepository);
    const friendshipRequestTypeService = new FriendshipRequestTypeService(friendshipRequestTypeRepository);
    const friendshipRequestTypeController = new FriendshipRequestTypeController(friendshipRequestTypeService);
    const friendshipRequestTypeRoutes = createFriendshipRequestTypeRoutes(friendshipRequestTypeController);
    return { friendshipRequestTypeRoutes }
}

module.exports = configureFriendshipRequestTypeContainer;

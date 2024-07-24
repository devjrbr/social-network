const TokenRepositoryImplementation = require('../repositories/implementation/tokenRepositoryImplementation');
const FriendshipRequestRepositoryImplementation = require('../repositories/implementation/friendshipRequestRepository');
const FriendshipRequestRepository = require('../repositories/friendshipRequestRepository');
const TokenRepository = require('../repositories/tokenRepository');
const HashService = require('../services/cryptoService');
const TokenService = require('../services/tokenService');
const FriendshipRequestService = require('../services/friendshipRequestService');
const FriendshipRequestController = require("../controller/friendshipRequestController");
const createFriendshipRequestRoutes = require("../routes/friendshipRequestRoutes");
const FriendshipRepositoryImplementation = require("../repositories/implementation/friendshipRepositoryImplementation");
const { IFriendshipRequestRepository } = require("../repositories/interfaces/friendshipRequestAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");
const FriendshipRepository = require("../repositories/friendshipRepository");
const { IFriendshipRepository } = require("../repositories/interfaces/friendshipRepositoryAbstract");
const FriendshipService = require("../services/friendshipServices");

function configureFriendshipRequestContainer() {
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const friendshipRequestRepositoryImplementation = new FriendshipRequestRepositoryImplementation();
    const friendshipRepositoryImplementation = new FriendshipRepositoryImplementation();
    const friendshipRequestRepository = new FriendshipRequestRepository(friendshipRequestRepositoryImplementation, IFriendshipRequestRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const friendshipRepository = new FriendshipRepository(friendshipRepositoryImplementation, IFriendshipRepository);
    const hashService = new HashService();
    const tokenService = new TokenService(tokenRepository, hashService);
    const friendshipService = new FriendshipService(friendshipRepository);
    const friendshipRequestService = new FriendshipRequestService(friendshipRequestRepository);
    const friendshipRequestController = new FriendshipRequestController(friendshipRequestService, tokenService, friendshipService);
    const friendshipRequestRoutes = createFriendshipRequestRoutes(friendshipRequestController);
    return { friendshipRequestRoutes }
}

module.exports = configureFriendshipRequestContainer;

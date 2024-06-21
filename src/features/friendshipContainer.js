const FriendshipRepositoryImplementation = require("../repositories/implementation/friendshipRepositoryImplementation")
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const FriendshipRepository = require("../repositories/friendshipRepository");
const FriendshipService = require("../services/friendshipServices");
const FriendshipController = require("../controller/friendshipController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createFriendshipRoutes = require("../routes/friendshipRoutes");
const { IFriendshipRepository } = require('../repositories/interfaces/friendshipRepositoryAbstract');
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureFriendshipContainer() {
    const friendshipRepositoryImplementation = new FriendshipRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const friendshipRepository = new FriendshipRepository(friendshipRepositoryImplementation, contract=IFriendshipRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, contract=ITokenRepository);
    const tokenService = new TokenService(tokenRepository);
    const friendshipService = new FriendshipService(friendshipRepository);
    const friendshipController = new FriendshipController(friendshipService, tokenService);
    const friendshipRoutes = createFriendshipRoutes(friendshipController);
    return { friendshipRoutes }
}

module.exports = configureFriendshipContainer;

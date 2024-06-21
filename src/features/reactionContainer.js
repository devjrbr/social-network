const ReactionRepositoryImplementation = require("../repositories/implementation/reactionRepositoryImplementation")
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const ReactionRepository = require("../repositories/reactionRepository");
const ReactionService = require("../services/reactionService");
const ReactionController = require("../controller/reactionController");
const TokenRepository = require("../repositories/tokenRepository");
const TokenService = require("../services/tokenService");
const createReactionRoutes = require("../routes/reactionRoutes");
const { IReactionRepository } = require("../repositories/interfaces/reactionRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureReactionContainer() {
    const reactionRepositoryImplementation = new ReactionRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const reactionRepository = new ReactionRepository(reactionRepositoryImplementation, contract=IReactionRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, contract=ITokenRepository);
    const tokenService = new TokenService(tokenRepository);
    const reactionService = new ReactionService(reactionRepository);
    const reactionController = new ReactionController(reactionService, tokenService);
    const reactionRoutes = createReactionRoutes(reactionController);
    return { reactionRoutes }
}

module.exports = configureReactionContainer;

const ReactionTypeRepositoryImplementation = require("../repositories/implementation/reactionTypeRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const ReactionTypeRepository = require("../repositories/reactionTypeRepository");
const ReactionTypeService = require("../services/reactionTypeService");
const ReactionTypeController = require("../controller/reactionTypeController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createReactionTypeRoutes = require("../routes/reactionTypeRoutes");
const {IReactionTypeRepository} = require("../repositories/interfaces/reactionTypeRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureReactionTypeContainer() {
    const reactionTypeRepositoryImplementation = new ReactionTypeRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const reactionTypeRepository = new ReactionTypeRepository(reactionTypeRepositoryImplementation, IReactionTypeRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const tokenService = new TokenService(tokenRepository);
    const reactionTypeService = new ReactionTypeService(reactionTypeRepository);
    const reactionTypeController = new ReactionTypeController(reactionTypeService, tokenService);
    const reactionTypeRoutes = createReactionTypeRoutes(reactionTypeController);
    return { reactionTypeRoutes }
}

module.exports = configureReactionTypeContainer;

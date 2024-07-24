const TargetPublicRepositoryImplementation = require("../repositories/implementation/targetPublicRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const TargetPublicRepository = require("../repositories/implementation/targetPublicRepositoryImplementation");
const TargetPublicService = require("../services/targetPublicService");
const TargetPublicController = require("../controller/targetPublicController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createTargetPublicRoutes = require("../routes/targetPublicRoutes");
const { ITargetPublicRepository } = require("../repositories/interfaces/targetPublicRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureTargetPublicContainer(){
    const targetPublicRepositoryImplementation = new TargetPublicRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const targetPublicRepository = new TargetPublicRepository(targetPublicRepositoryImplementation, ITargetPublicRepository);
    const tokenService = new TokenService(tokenRepository);
    const targetPublicService = new TargetPublicService(targetPublicRepository);
    const targetPublicController = new TargetPublicController(targetPublicService, tokenService);
    const targetPublicRoutes = createTargetPublicRoutes(targetPublicController);
    return { targetPublicRoutes }
}

module.exports = configureTargetPublicContainer;

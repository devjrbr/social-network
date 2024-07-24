const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const UserRepositoryImplementation = require("../repositories/implementation/userRepositoryImplementation");
const TokenRepository = require("../repositories/tokenRepository");
const TokenService = require("../services/tokenService");
const UserRepository = require("../repositories/userRepository");
const AuthenticateService = require("../services/authService");
const UserService = require("../services/userServices");
const UserController = require("../controller/userController");
const HashService = require("../services/cryptoService");
const createUserRoutes = require("../routes/userRoutes");
const { IUserRepository } = require("../repositories/interfaces/userRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureUserContainer(){
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const userRepositoryImplementation = new UserRepositoryImplementation();
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const hashService = new HashService();
    const tokenService = new TokenService(tokenRepository, hashService);
    const userRepository = new UserRepository(userRepositoryImplementation, IUserRepository);
    const authenticateService = new AuthenticateService(userRepository, hashService);
    const userService = new UserService(userRepository, hashService);
    const userController = new UserController(userService, authenticateService, tokenService);
    const userRoutes = createUserRoutes(userController);
    return { userRoutes }
}

module.exports = configureUserContainer;

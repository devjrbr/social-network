const PostRepositoryImplementation = require("../repositories/implementation/postRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const PostRepository = require("../repositories/postRepository");
const PostService = require("../services/postService");
const PostController = require("../controller/postController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createPostRoutes = require("../routes/postRoutes");
const { IPostRepository } = require("../repositories/interfaces/postRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configurePostContainer() {
    const postRepositoryImplementation = new PostRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const postRepository = new PostRepository(postRepositoryImplementation, IPostRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const postService = new PostService(postRepository);
    const tokenService = new TokenService(tokenRepository);
    const postController = new PostController(postService, tokenService);
    const postRoutes = createPostRoutes(postController);
    return { postRoutes }
}

module.exports = configurePostContainer;

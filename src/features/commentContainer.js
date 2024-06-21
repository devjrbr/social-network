const CommentRepositoryImplementation = require("../repositories/implementation/commentRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const CommentRepository = require("../repositories/commentRepository");
const CommentService = require("../services/commentService");
const CommentController = require("../controller/commentController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createCommentRoutes = require("../routes/commentRoutes");
const { ICommentRepository } = require("../repositories/interfaces/commentRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureCommentContainer() {
    const commentRepositoryImplementation = new CommentRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const commentRepository = new CommentRepository(commentRepositoryImplementation, contract=ICommentRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, contract=ITokenRepository);
    const tokenService = new TokenService(tokenRepository);
    const commentService = new CommentService(commentRepository);
    const commentController = new CommentController(commentService, tokenService);
    const commentRoutes = createCommentRoutes(commentController);
    return { commentRoutes }
}

module.exports = configureCommentContainer;

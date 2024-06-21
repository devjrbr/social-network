const AlbumItemRepositoryImplementation = require("../repositories/implementation/albumItemRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const AlbumItemRepository = require("../repositories/albumItemRepository");
const AlbumItemService = require("../services/albumItemService");
const AlbumItemController = require("../controller/albumItemController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createAlbumItemRoutes = require("../routes/albumItemRoutes");
const { IAlbumItemRepository } = require("../repositories/interfaces/albumItemRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

function configureAlbumItemContainer() {
    const albumItemRepositoryImplementation = new AlbumItemRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, contract=ITokenRepository);
    const albumItemRepository = new AlbumItemRepository(albumItemRepositoryImplementation, contract=IAlbumItemRepository);
    const tokenService = new TokenService(tokenRepository);
    const albumItemService = new AlbumItemService(albumItemRepository);
    const albumItemController = new AlbumItemController(albumItemService, tokenService);
    const albumItemRoutes = createAlbumItemRoutes(albumItemController);
    return { albumItemRoutes }
}

module.exports = configureAlbumItemContainer;

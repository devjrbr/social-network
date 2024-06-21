const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumItemService {
    constructor(albumItemRepository) {
        this.albumItemRepository = albumItemRepository;
    }
    async createAlbumItem(postId, albumItemId) {
        return this.albumItemRepository.create(postId, albumItemId);
    };
    async getAllAlbumItem(albumItemId) {
        return this.albumItemRepository.getAll(albumItemId);
    };
    async deleteAlbumItem(albumItemId) {
        const albumItem = await this.albumItemRepository.getById(albumId);
        if (!albumItem) throw new ApiError(httpStatus.NOT_FOUND, 'Album item not found');
        await this.albumItemRepository.delete(albumItemId);
    };
}

module.exports = AlbumItemService;

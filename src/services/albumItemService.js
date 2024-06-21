const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class AlbumItemService {
    constructor(albumItemRepository) {
        this.albumItemRepository = albumItemRepository;
    }
    async createAlbumItem(post_id, album_id) {
        return this.albumItemRepository.create(post_id, album_id);
    };
    async getAllAlbumItem(albumId) {
        return this.albumItemRepository.getAll(albumId);
    };
    async deleteAlbumItem(id) {
        const albumItem = await this.albumItemRepository.getById(id);
        if (!albumItem) throw new ApiError(httpStatus.NOT_FOUND, 'Album item not found');
        await this.albumItemRepository.delete(id);
    };
}

module.exports = AlbumItemService;

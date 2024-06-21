const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class AlbumService {
    constructor(albumRepository) {
        this.albumRepository = albumRepository;
    }
    async createAlbum(description, target_id) {
        return this.albumRepository.create(description, target_id);
    };
    async getAlbumById(id) {
        const album = await this.albumRepository.getById(id);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        return album;
    };
    async getAllAlbums(albumId) {
        return this.albumRepository.getAll(albumId);
    };
    async updateAlbum(id, description, target_id) {
        const album = await this.albumRepository.getById(id);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        await this.albumRepository.update(id, description, target_id);
    };
    async deleteAlbum(id) {
        const album = await this.albumRepository.getById(id);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        await this.albumRepository.delete(id);
    };
}

module.exports = AlbumService;

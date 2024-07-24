const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class AlbumService {
    constructor(albumRepository) {
        this.albumRepository = albumRepository;
    };
    createAlbum(description, targetId) {
        return this.albumRepository.create(description, targetId);
    };
    async getAlbumById(albumId) {
        const album = await this.albumRepository.getById(albumId);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        return album;
    };
    getAllAlbums(albumId) {
        return this.albumRepository.getAll(albumId);
    };
    async updateAlbum(albumId, description, targetId) {
        const album = await this.albumRepository.getById(albumId);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        await this.albumRepository.update(albumId, description, targetId);
    };
    async deleteAlbum(albumId) {
        const album = await this.albumRepository.getById(albumId);
        if (!album) throw new ApiError(httpStatus.NOT_FOUND, 'Album not found!');
        await this.albumRepository.delete(albumId);
    };
}

module.exports = AlbumService;

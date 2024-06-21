const httpStatus = require('../utils/statusCodes');

class AlbumController {
    constructor(albumService, tokenService) {
        this.albumService = albumService;
        this.tokenService = tokenService;
    }
    async createAlbum(req, res) {
        const { description, target_id: targetId } = req.body;
        const album = await this.albumService.createAlbum(description, targetId);
        return res.status(httpStatus.CREATED).json({
            message: 'Album created successfully!',
            data: album
        });
    }
    async getAlbumById(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token); 
        const album = await this.albumService.getAlbumById(id);
        return res.status(httpStatus.OK).json(album);
    }
    async getAlbums(req, res) {
        const { authorization: token } = req.headers;
        const albumId = await this.tokenService.getIdFromToken(token);
        const album = await this.albumService.getAllAlbums(albumId);
        return res.status(httpStatus.OK).json(album);
    }
    async updateAlbum(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { description, target_id } = req.body;
        await this.albumService.updateAlbum(id, description, target_id);
        return res.status(httpStatus.OK).json({
            details: "Album updated successfully"
        });
    }
    async deleteAlbum(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        await this.albumService.deleteAlbum(id);
        return res.status(httpStatus.OK).json({
            details: "Album deleted successfully"
        });
    }
}

module.exports = AlbumController;

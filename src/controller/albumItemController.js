const httpStatus = require('../utils/statusCodes');

class AlbumItemController {
    constructor(albumItemService, tokenService) {
        this.albumItemService = albumItemService;
        this.tokenService = tokenService;
    }
    async createAlbumItem(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token); 
        const { post_id, album_id } = req.body;
        const albumItem = await this.albumItemService.createAlbumItem(post_id, album_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Album item created successfully!',
            data: albumItem
        });
    }
    async getAlbumItems(req, res) {
        const { authorization: token } = req.headers;
        const albumID = await this.tokenService.getIdFromToken(token);
        const albumItem = await this.albumItemService.getAllAlbumItem(albumID);
        return res.status(httpStatus.OK).json(albumItem);
    }
    async deleteAlbumItem(req, res) {
        const { id } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token); 
        await this.albumItemService.deleteAlbumItem(id);
        return res.status(httpStatus.OK).json({
            details: "Album item deleted successfully"
        });
    }
}
module.exports = AlbumItemController;

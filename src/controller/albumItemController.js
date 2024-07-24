const httpStatus = require('../utils/statusCodes');

class AlbumItemController {
    constructor(albumItemService, tokenService) {
        this.albumItemService = albumItemService;
        this.tokenService = tokenService;
    }
    async createAlbumItem(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token); 
        const { post_id: postId, album_id: albumItemId } = req.body;
        const albumItem = await this.albumItemService.createAlbumItem(postId, albumItemId);
        return res.status(httpStatus.CREATED).json({
            message: 'Album item created successfully!',
            data: albumItem
        });
    }
    async getAlbumItems(req, res) {
        const { authorization: token } = req.headers;
        const albumItemId = await this.tokenService.getIdFromToken(token);
        const albumItem = await this.albumItemService.getAllAlbumItem(albumItemId);
        return res.status(httpStatus.OK).json(albumItem);
    }
    async deleteAlbumItem(req, res) {
        const { album_item_id: albumItemId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token); 
        await this.albumItemService.deleteAlbumItem(albumItemId);
        return res.status(httpStatus.OK).json({
            details: "Album item deleted successfully"
        });
    }
}

module.exports = AlbumItemController;

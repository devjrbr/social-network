const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumItemRepository } = require("../interfaces/albumItemRepositoryAbstract");


class AlbumItemRepositoryImplementation extends IAlbumItemRepository {
    async create(post_id, album_id) {
        try {
            return await db.transaction(async (trx) => {
                const [createdItem] = await db('Album_Item')
                    .insert({
                        post_id: post_id,
                        album_id: album_id
                    })
                    .returning(['id', 'post_id', 'album_id', 'is_active'])
                    .transacting(trx);

                return createdItem;
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,error);
        }
    }

    getById(albumId) {
        return db('Album_Item')
            .where({ id: albumId })
            .select(['id', 'post_id', 'album_id', 'is_active'])
            .first();
    }

    async getAll(albumId) {
        return db('Album_Item')
            .where({ id: albumId })
            .select(['id', 'post_id', 'album_id', 'is_active']);
    }

    async delete(id) {
        try {
            await db.transaction(async (trx) => {
                await db('Album_Item')
                    .update({ is_active: false })
                    .where({ id: id })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting album item');
        }
    }
}

module.exports = AlbumItemRepositoryImplementation;

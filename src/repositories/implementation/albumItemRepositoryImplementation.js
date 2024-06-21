const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumItemRepository } = require("../interfaces/albumItemRepositoryAbstract");


class AlbumItemRepositoryImplementation extends IAlbumItemRepository {
    async create(postId, albumItemId) {
        try {
            return await db.transaction(async (trx) => {
                const [createdItem] = await db('Album_Item')
                    .insert({
                        post_id: postId,
                        album_id: albumItemId
                    })
                    .returning(['id', 'post_id', 'album_id', 'is_active'])
                    .transacting(trx);

                return createdItem;
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,error);
        }
    }

    getById(albumItemId) {
        return db('Album_Item')
            .where({ id: albumItemId })
            .select(['id', 'post_id', 'album_id', 'is_active'])
            .first();
    }

    getAll(albumItemId) {
        return db('Album_Item')
            .where({ id: albumItemId })
            .select(['id', 'post_id', 'album_id', 'is_active']);
    }

    async delete(albumItemId) {
        try {
            await db.transaction(async (trx) => {
                await db('Album_Item')
                    .update({ is_active: false })
                    .where({ id: albumItemId })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting album item');
        }
    }
}

module.exports = AlbumItemRepositoryImplementation;

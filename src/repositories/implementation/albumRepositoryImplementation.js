const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IAlbumRepository } = require("../interfaces/albumRepositoryAbstract");


class AlbumRepositoryImplementation extends IAlbumRepository{
    async create(description, targetId) {
        try {
            const[album] = await db('album')
                .insert({
                    description: description,
                    target_id: targetId
                })
                .returning('*');
            return album           
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new album');
        }
    };
    getById(albumId){
        return db('album')
            .where({ id: albumId })
            .select('id', 'description', 'target_id', 'is_active')
            .first();        
    };
    getAll(albumId){
        return db('album')
            .where({ id: albumId })
            .select('id', 'description', 'target_id', 'is_active');
    };
    async update(albumId, description, targetId) {
        try {
            await db.transaction(async (trx) => {
                await db('album')
                    .where({ id: albumId })
                    .update({
                        description, targetId
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating album');
        }
    };
    async delete (albumId) {
        try {
            await db.transaction(async (trx) => {
                await db('album')
                    .where({ id: albumId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting album');
        }
    };
}

module.exports = AlbumRepositoryImplementation;

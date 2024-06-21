const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IPostRepository } = require("../interfaces/postRepositoryAbstract");

class PostRepositoryImplementation extends IPostRepository {
    async create(description, userId, target_id, type_id) {
        try {
            const [post] = await db.transaction(async (trx) => {
                return db('post')
                    .transacting(trx)
                    .insert({
                        description,
                        user_id: userId,
                        target_id,
                        type_id
                    });
            });
            return post;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    };

    async getById(id){
        return db('post')
            .where({ id })
            .select('id', 'description', 'user_id', 'target_id', 'type_id', 'is_active')
            .first();
    };

    async getAll(userId){
        return db('post')
            .where( {user_id: userId})
            .select('id', 'description', 'user_id', 'target_id', 'type_id', 'is_active');
    };

    async update(id, description, target_id, type_id) {
        try {
            await db.transaction(async (trx) => {
                await db('post')
                    .where({ id })
                    .update({
                        description: description,
                        target_id: target_id,
                        type_id: type_id
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating post');
        }
    };

    async delete (id) {
        try {
            await db.transaction(async (trx) => {
                await db('post')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting post');
        }
    };
}

module.exports = PostRepositoryImplementation;

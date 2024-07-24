const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IPostRepository } = require("../interfaces/postRepositoryAbstract");

class PostRepositoryImplementation extends IPostRepository {
    async create(description, userId, targetId, typeId) {
        try {
            const [post] = await db.transaction(async (trx) => {
                return db('post')
                    .transacting(trx)
                    .insert({
                        description: description,
                        user_id: userId,
                        target_id: targetId,
                        type_id: typeId
                    });
            });
            return post;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    };

    async getById(postId){
        return db('post')
            .where({ id: postId })
            .select('id', 'description', 'user_id', 'target_id', 'type_id', 'is_active')
            .first();
    };

    async getAll(userId){
        return db('post')
            .where( {user_id: userId})
            .select('id', 'description', 'user_id', 'target_id', 'type_id', 'is_active');
    };

    async update(id, description, targetId, typeId) {
        try {
            await db.transaction(async (trx) => {
                await db('post')
                    .where({ id })
                    .update({
                        description: description,
                        target_id: targetId,
                        type_id: typeId
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating post');
        }
    };

    async delete (postId) {
        try {
            await db.transaction(async (trx) => {
                await db('post')
                    .where({ id: postId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting post');
        }
    };
}

module.exports = PostRepositoryImplementation;

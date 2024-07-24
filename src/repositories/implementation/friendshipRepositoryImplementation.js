const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRepository } = require("../interfaces/friendshipRepositoryAbstract");

class FriendshipRepositoryImplementation extends IFriendshipRepository {
    async create(principalUserId, friendId) {
        try {
            const [friendship] = await db.transaction(async (trx) => {
                return db('friendship')
                    .transacting(trx)
                    .insert({
                        principal_user_id: principalUserId,
                        friend_id: friendId,
                        is_active: true
                    });
            });
            return friendship;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    };

    async getAll(userId){
        return db('friendship')
            .where({ principal_user_id: userId })
            .select('id', 'principal_user_id', 'friend_id', 'is_active');
    };

    async getById(id){
        return db('friendship')
            .where({ id })
            .select('id', 'principal_user_id', 'friend_id', 'is_active')
            .first();
    };

    async delete(id){
        try {
            await db.transaction(async (trx) => {
                await db('friendship')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting friendship');
        }
    };
}

module.exports = FriendshipRepositoryImplementation;

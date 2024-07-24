const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IReactionTypeRepository } = require("../interfaces/reactionTypeRepositoryAbstract");

class ReactionTypeRepositoryImplementation extends IReactionTypeRepository {
    async create(description) {
        try {
            const [reactionType] = await db.transaction(async (trx) => {
                return db('reaction_type')
                    .transacting(trx)
                    .insert({ description });
            });
            return reactionType;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction type');
        }
    };

    getById(reactionTypeId){
        return db('reaction_type')
            .where({ id: reactionTypeId })
            .select('id', 'description', 'is_active')
            .first();
    };

    getAll(){
        return db('reaction_type')
            .select('id', 'description', 'is_active');
    };

    async delete(id) {
        try {
            await db.transaction(async (trx) => {
                await db('reaction_type')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting reaction type');
        }
    };
}

module.exports = ReactionTypeRepositoryImplementation;

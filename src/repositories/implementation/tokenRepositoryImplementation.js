const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const {ITokenRepository} = require("../interfaces/tokenRepositoryAbstract");
 
class TokenRepositoryImplementation extends ITokenRepository{
    create(token, userId) {
        try {
            return db('token').insert({
                value: token,
                user_id: userId
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating token');
        }
    }

    getTokenByUserId(userId) {
    try {
        return db('token').where({ user_id: userId }).first();
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while revoking token');
    }
}

    revokeTokenByUserId(userId) {
        try {
            db('token').where({ user_id: userId }).del();
        } catch (error) {
            throw new Error('Error while revoking token');
        }
    }

    updateById(id, newToken) {
        try {
            db('token').where({ id: id }).update({ value: newToken });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting token');
        }
    }
}

module.exports = TokenRepositoryImplementation;

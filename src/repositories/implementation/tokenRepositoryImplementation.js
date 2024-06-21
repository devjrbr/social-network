const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const {ITokenRepository} = require("../interfaces/tokenRepositoryAbstract");
 
class TokenRepositoryImplementation extends ITokenRepository{
async create(token, user_id) {
    try {
        const result = await db('token').insert({
        value: token,
        user_id: user_id
    });
        return result;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating token');
    }
    }
async getTokenByUserId(userId) {
    try {
        const token = await db('token').where({ user_id: userId }).first();
        return token;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while revoking token');
    }
}
async revokeTokenByUserId(userId) {
    try {
        await db('token').where({ user_id: userId }).del();
    } catch (error) {
        throw new Error('Error while revoking token');
    }
}

async updateById(id, newToken) {
    try {
        await db('token').where({ id: id }).update({ value: newToken });
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting token');
    }
}}

module.exports = TokenRepositoryImplementation;

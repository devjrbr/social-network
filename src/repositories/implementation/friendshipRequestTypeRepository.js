const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRequestTypeRepository } = require("../interfaces/friendshipRequestTypeAbstract");

class FriendshipRequestTypeRepositoryImplementation extends IFriendshipRequestTypeRepository {
    async create(type) {
        try {
            await db("friendship_request_type").insert({
                type: type,
                created_at: new Date(),
                updated_at: new Date()
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request type');
        }
    }

    async getAll() {
        try {
            return await db("friendship_request_type").select("id", "type");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting all friendship request types');
        }
    }

    async getById(id) {
        try {
            return await db("friendship_request_type")
                .where({ id: id })
                .first()
                .select("id", "type");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting friendship request type by id');
        }
    }

    async delete(id) {
        try {
            await db("friendship_request_type")
                .where({ id: id })
                .del();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting friendship request type');
        }
    }
}

module.exports = FriendshipRequestTypeRepositoryImplementation;

const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRequestTypeRepository } = require("../interfaces/friendshipRequestTypeAbstract");

class FriendshipRequestTypeRepositoryImplementation extends IFriendshipRequestTypeRepository {
    create(newFriendShipRequestType) {
        try {
            db("friendship_request_type").insert({
                type: newFriendShipRequestType,
                created_at: new Date(),
                updated_at: new Date()
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request type');
        }
    };
    getAll() {
        try {
            return db("friendship_request_type").select("id", "type");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting all friendship request types');
        }
    };
    getById(friendShipRequestTypeId) {
        try {
            return db("friendship_request_type")
                .where({ id: friendShipRequestTypeId })
                .first()
                .select("id", "type");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting friendship request type by id');
        }
    };
    delete(friendShipRequestTypeId) {
        try {
            db("friendship_request_type")
                .where({ id: friendShipRequestTypeId })
                .del();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting friendship request type');
        }
    };
}

module.exports = FriendshipRequestTypeRepositoryImplementation;

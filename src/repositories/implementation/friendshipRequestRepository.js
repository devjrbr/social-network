const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRequestRepository } = require("../interfaces/friendshipRequestAbstract");
const friendshipRequestTypeStatus = require("../../utils/friendshipRequestTypeStatus");
const httpStatus = require('../../utils/statusCodes');

class FriendshipRequestRepositoryImplementation extends IFriendshipRequestRepository {
    async create(senderId, receiveId) {
        try {
            await db("friendship_request").insert({
                sender_id: senderId,
                receiver_id: receiveId,
                request_type_id: friendshipRequestTypeStatus.AWAITING_APPROVAL
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request');
        }
    }

    async getAll(userId) {
        try {
            return await db("friendship_request")
                .where("sender_id", userId)
                .orWhere("receiver_id", userId)
                .select("*");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting all friendship requests');
        }
    }

    async accept(requestId) {
        try {
            await db("friendship_request")
                .where({ id: requestId })
                .update({
                    request_type_id: friendshipRequestTypeStatus.ACCEPTED,
                    updated_at: new Date()
                });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while accepting friendship request');
        }
    }

    async delete(requestId) {
        try {
            await db("friendship_request")
                .where({ id: requestId })
                .del();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting friendship request');
        }
    }
}

module.exports = FriendshipRequestRepositoryImplementation;

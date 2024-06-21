const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ICommentRepository } = require("../interfaces/commentRepositoryAbstract");

class CommentRepositoryImplementation extends ICommentRepository{
    async create(description, user_id, post_id) {
        try {
            const [comment] = await db('comment')
                .insert({
                    description,
                    user_id,
                    post_id,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                })
                .returning('*');
            return comment;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a comment');
        }
    }

    getById(id) {
        try {
            return db('comment').where({ id }).first();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while fetching comment by id');
        }
    }

    getAll(commentId) {
        try {
            return db('comment').where({ user_id: commentId });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async update(id, description, user_id, post_id) {
        try {
            const [comment] = await db('comment')
                .where({ id })
                .update({
                    description,
                    user_id,
                    post_id,
                    updated_at: new Date()
                })
                .returning('*');
            return comment;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating comment');
        }
    }

    async delete(id) {
        try {
            await db('comment')
                .where({ id })
                .update({ is_active: false });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting comment');
        }
    }
}

module.exports = CommentRepositoryImplementation;

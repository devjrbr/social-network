const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { description, user_id: userId, post_id: postId } = req.body;
        const { id: commentId } = req.params;
        const { authorization } = req.headers;
        await schema.validate({
            id: commentId,
            authorization: authorization,
            description: description,
            user_id: userId,
            post_id: postId
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;

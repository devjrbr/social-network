const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { post_id: postId, album_id: albumId } = req.body;
        const { authorization } = req.headers;
        const { id } = req.params;
        await schema.validate({
            id: id,
            authorization: authorization,
            post_id: postId,
            album_id: albumId
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;

const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { description, target_id: targetId } = req.body;
        const { authorization } = req.headers;
        const { id: albumId } = req.params;
        await schema.validate({
            album_id: albumId,
            authorization: authorization,
            description: description,
            target_id: targetId
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;

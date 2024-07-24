const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { description, target_id: targetId, type_id: typeId } = req.body;
        const { id } = req.params;
        const { authorization } = req.headers;
        await schema.validate({
            id: id,
            authorization: authorization,
            description: description,
            target_id: targetId,
            type_id: typeId
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;


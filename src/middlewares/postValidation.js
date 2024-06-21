const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { description, target_id, type_id } = req.body;
        const { id } = req.params;
        const { authorization } = req.headers;
        await schema.validate({
            id,
            authorization,
            description,
            target_id,
            type_id
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;


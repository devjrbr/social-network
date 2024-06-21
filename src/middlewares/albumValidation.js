const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { description, target_id } = req.body;
        const { authorization } = req.headers;
        const { id } = req.params;
        await schema.validate({
            id,
            authorization,
            description,
            target_id
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;

const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { description } = req.body;
        const { id } = req.params;
        await schema.validate({
            id,
            description
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;

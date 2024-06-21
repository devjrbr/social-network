const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;
        const { id } = req.params;
        const { authorization } = req.headers;
        await schema.validate({
            authorization,
            id,
            full_name,
            email,
            password
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;

const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

const validation = (schema) => async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await schema.validate({
            email,
            password
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}


module.exports = validation;
const httpStatus = require('../utils/statusCodes');
const ApiError = require('../utils/ApiError');
require('dotenv').config()

class AuthenticateService {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async authenticateLoginUser(email, password) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password incorrect');
        const isValidPassword = await this.hashService.compare(password, user.password);
        if (!isValidPassword) throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password incorrect');
        return user.id
    };
}

module.exports = AuthenticateService;

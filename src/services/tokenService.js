const jwt = require('jsonwebtoken');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class TokenService {
    constructor(tokenRepository, hashService) {
        this.tokenRepository = tokenRepository;
        this.hashService = hashService;
    };
    async generateAuthTokens(user) {
        const payload = {id: user};
        const token = await this.generateToken(payload, process.env.JWT_SECRET, '2h');
        const refreshToken = await this.generateToken(payload, process.env.JWT_SECRET, '10h');
        const hashedRefreshToken = await this.hashService.hash(refreshToken);
        await this.tokenRepository.revokeTokenByUserId(user);
        await this.tokenRepository.create(hashedRefreshToken, user);
        return {token, refreshToken}
    };
    async generateToken(payload, secret, expiresIn) {
        return jwt.sign(payload, secret, {expiresIn: expiresIn})
    };
    async getIdFromToken(token) {
        const {id: userId} = await this.verifyToken(token, process.env.JWT_SECRET);
        if (!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not valid');
        return userId;
    };
    async generateRefreshToken(refreshToken) {
        const userId = await this.getIdFromToken(refreshToken);
        const oldRefreshToken = await this.tokenRepository.getTokenByUserId(userId);
        const isValidToken = await this.hashService.compare(refreshToken, oldRefreshToken.value);
        if (!isValidToken) throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token not valid');
        const newAccessToken = await this.generateToken({userId: userId}, process.env.JWT_SECRET, process.env.JWT_NEW_ACCESS_TOKEN);
        const hashedNewAccessToken = await this.hashService.hash(newAccessToken);
        await this.tokenRepository.updateById(oldRefreshToken.id, hashedNewAccessToken);
        return newAccessToken
    }
    async verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new ApiError(httpStatus.UNAUTHORIZED, error);
        }
    };
}

module.exports = TokenService;

const httpStatus = require('../utils/statusCodes');
const ApiError = require("../utils/ApiError");

class UserController {
  constructor(userService, authenticateService, tokenService) {
    this.userService = userService;
    this.authenticateService = authenticateService;
    this.tokenService = tokenService;
  };
  async create(req, res) {
    const { full_name: fullName, email, password } = req.body;
    const user = await this.userService.create(fullName, email, password);
    return res.status(httpStatus.CREATED).json({
      message: 'User created successfully!',
      data: user
    });    
  };
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await this.authenticateService.authenticateLoginUser(email, password);
    if(!user) throw new ApiError(httpStatus.UNAUTHORIZED,'Email or password incorrect');
    const { token, refreshToken } = await this.tokenService.generateAuthTokens(user);
    return res.status(httpStatus.OK).json({
      message: 'Logged in successfully',
      token: token,
      refreshToken: refreshToken
    })
  };
  async createRefreshToken(req, res){
    const { refreshToken } = req.body;
    const newRefreshToken = await this.tokenService.generateRefreshToken(refreshToken);
    return res.status(httpStatus.CREATED).json({
      message: 'Refresh token generated successfully',
      refreshToken: newRefreshToken
    });
  };
  async getUserById(req, res) {
    const { id: userId } = req.params;
    const { authorization: token } = req.headers;
    await this.tokenService.verifyToken(token);
    const user = await this.userService.getUserById(userId);
    return res.status(httpStatus.OK).json(user);
  };
  async getUsers(req, res) {
    const users = await this.userService.getAllUsers();
    return res.status(httpStatus.OK).json(users);
  };
  async updateUser(req, res) {
    const { authorization: token } = req.headers;
    const userId = await this.tokenService.getIdFromToken(token);
    const { full_name: fullName, email, password } = req.body;
    await this.userService.updateUserById(userId, fullName, email, password);
    return res.status(httpStatus.OK).json({
      details: "User updated successfully"
    });  
  };
  async deleteUser(req, res) {
    const { authorization: token } = req.headers;
    const userId = await this.tokenService.getIdFromToken(token);
    await this.userService.deleteUser(userId);
    return res.status(httpStatus.OK).json({
      details: "User deleted successfully"
    });
  };
  async getFeedNews(req, res) {    
    const { authorization: token } = req.headers;
    const userId = await this.tokenService.getIdFromToken(token);
    const feed = await this.userService.getFeedNews(userId);
    return res.status(httpStatus.OK).json({
      feed: {posts: feed}
    });    
  }
  async getPostStatistics(req, res) {
    const postStatistics = await this.userService.getPostStatistics();
    return res.status(httpStatus.OK).json({
      post_statistics: postStatistics
    });
  };
}

module.exports = UserController;

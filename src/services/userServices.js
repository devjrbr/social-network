const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class UserService {
  constructor(userRepository, hashService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
  };
  async create(fullName, email, password) {
    const isEmailTaken = await this.userRepository.getByEmail(email);
    if (isEmailTaken) throw new ApiError(httpStatus.CONFLICT,'Email already taken');
    const hashedPassword = await this.hashService.hash(password);
    return this.userRepository.create(fullName, email, hashedPassword);
  };
  async getUserById(id) {
      const user = await this.userRepository.getById(id);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      return user;
  };
  async isEmailTaken(email) {
    const existingUser = await this.userRepository.getByEmail(email);
    return !!existingUser;
  }
  async getAllUsers() {
    const users = await this.userRepository.getAll();
    if (!users) throw new ApiError(httpStatus.NOT_FOUND, 'No users was found!');
    return users;
  };
  async updateUserById(id, full_name, email) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    const isEmailTaken = await this.isEmailTaken(email);
    if (isEmailTaken) throw new ApiError(httpStatus.CONFLICT,'Email already taken');
    await this.userRepository.update(id, full_name, email);
  };
  async deleteUser(id) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    await this.userRepository.delete(id);
  };
  async getFeedNews(userId) {
    return this.userRepository.getFeedNews(userId);
  };
  async getPostStatistics() {
    const postStatistics = await this.userRepository.getPostStatistics();
    if (!postStatistics) throw new ApiError(httpStatus.NOT_FOUND, 'No post statistics was found!');
    return postStatistics;
  };
}

module.exports = UserService;

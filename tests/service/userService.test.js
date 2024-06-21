const UserService = require('../../src/services/userServices');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockUserRepository = {
    getByEmail: jest.fn(),
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getFeedNews: jest.fn(),
    getPostStatistics: jest.fn(),
};
const mockHashService = {
    hash: jest.fn(),
};
let userService;
let inputUser;
let userValue;
let entityId;
describe('UserService', () => {
    beforeEach(() => {
        userService = new UserService(mockUserRepository, mockHashService);
        inputUser = {
            "full_name": "pedro",
            "email": "pedro2002@hotmail.com",
            "password": "1234"
        };
        userValue = {
            "created_at": "2024-03-13T21:06:22.629Z",
            "updated_at": "2024-03-13T21:06:22.629Z",
            "id": 32,
            "full_name": "pedro",
            "email": "pedro2002@hotmail.com"
        };
        entityId = 1
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('create', () => {
        it('should create a user', async () => {
            mockUserRepository.getByEmail.mockResolvedValueOnce(false);
            mockHashService.hash.mockResolvedValueOnce("$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.10");
            mockUserRepository.create.mockResolvedValueOnce(userValue);
            const user = await userService.create(inputUser.full_name, inputUser.email, inputUser.password);
            expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(inputUser.email);
            expect(mockHashService.hash).toHaveBeenCalledWith(inputUser.password);
            expect(mockUserRepository.create).toHaveBeenCalledWith(inputUser.full_name, inputUser.email, "$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.10");
            expect(user).toEqual(userValue);
        });
        it('should throw an error if email is already taken', async () => {
            mockUserRepository.getByEmail.mockResolvedValueOnce(true);
            expect(userService.create(inputUser.full_name, inputUser.email, inputUser.password)).rejects.toThrow(new ApiError(httpStatus.CONFLICT,'Email already taken'));
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });
    });
    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const expectUsersValues = [{
                "id": 3,
                "full_name": "Fernanda Oliveira",
                "email": "fernanda@gmail.com"
            }, {
                "id": 4,
                "full_name": "Lucas Silva",
                "email": "lucas@gmail.com"
            }];
            mockUserRepository.getAll.mockResolvedValueOnce(expectUsersValues);
            const allUsers = await userService.getAllUsers();
            expect(mockUserRepository.getAll).toHaveBeenCalled();
            expect(allUsers).toEqual(expectUsersValues);
        });
        it('should throw an error if no users found', async () => {
            mockUserRepository.getAll.mockResolvedValueOnce(null);
            expect(userService.getAllUsers()).rejects.toThrow(ApiError);
        });
    });
    describe('getUserById', () => {
        it('should return user by id', async () => {
            const expectUserValue = {
                "id": 3,
                "full_name": "Fernanda Oliveira",
                "email": "fernanda@gmail.com"
            }
            mockUserRepository.getById.mockResolvedValueOnce(expectUserValue);
            const calledMethodGetById = await userService.getUserById(entityId);
            expect(calledMethodGetById).toEqual(expectUserValue);
        });
        it('should return user by id', async () => {
            mockUserRepository.getById.mockResolvedValueOnce(null);
            expect(userService.getUserById(entityId)).rejects.toThrowError('User not found');
            expect(mockUserRepository.getById).toHaveBeenCalledWith(entityId);
        });
    });
    describe('updateUser', () => {
        it('should return updating user', async () => {
            mockUserRepository.getById.mockResolvedValueOnce(entityId);
            mockUserRepository.getByEmail.mockResolvedValueOnce(false);
            await userService.updateUserById(entityId, inputUser.full_name, inputUser.email);
            expect(mockUserRepository.update).toHaveBeenCalledWith(entityId, inputUser.full_name, inputUser.email);
            expect(mockUserRepository.getById).toHaveBeenCalledWith(entityId);
            expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(inputUser.email);
        });
        it('should throw an error if email is already taken', async () => {
            mockUserRepository.getById.mockResolvedValueOnce(entityId);
            mockUserRepository.getByEmail.mockResolvedValueOnce(true);
            expect(userService.updateUserById(entityId, inputUser.full_name, inputUser.email)).rejects.toThrow(new ApiError(httpStatus.CONFLICT, 'Email already taken'));
        });
        it('should throw an error if user does not exist', async () => {
            mockUserRepository.getById.mockResolvedValueOnce(null);
            await expect(userService.updateUserById(entityId, inputUser.full_name, inputUser.email)).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
            expect(mockUserRepository.getById).toHaveBeenCalledWith(entityId);
        });
    });
    describe('deleteUser', () => {
        it('should deleting user', async () => {
            mockUserRepository.getById.mockResolvedValueOnce(entityId);
            await userService.deleteUser(entityId);
            expect(mockUserRepository.getById).toHaveBeenCalledWith(entityId);
            expect(mockUserRepository.delete).toHaveBeenCalledWith(entityId);
        });
        it('should throw an error when trying to delete a non-existing user', async () => {
            mockUserRepository.getById.mockResolvedValueOnce(null);
            expect(userService.deleteUser(entityId)).rejects.toThrowError(new ApiError(httpStatus.NOT_FOUND, 'User not found'));
            expect(mockUserRepository.getById).toHaveBeenCalledWith(entityId);
            expect(mockUserRepository.delete).not.toHaveBeenCalled();
        });
    });
    describe('getFeedNews', () => {
        it('should getting feed News', async () =>{
            const userFeed = [
                {
                    "post_id": 15,
                    "post_description": "Construí uma cabana no Alaska",
                    "created_at": "2002-02-25T22:40:00.000Z",
                    "author": {
                        "id": 28,
                        "name": "Mariana Alves"
                    },
                    "reactions": {
                        "sad": 0,
                        "wow": 0,
                        "love": 0,
                        "angry": 0,
                        "hahah": 0,
                        "likes": 0
                    },
                    "comment_quantity": 0
                }
            ];
            mockUserRepository.getFeedNews.mockResolvedValueOnce(userFeed);
            const expectFeedNews = await userService.getFeedNews(entityId);
            expect(mockUserRepository.getFeedNews).toHaveBeenCalledWith(entityId);
            expect(expectFeedNews).toEqual(userFeed);
        });
    });
    describe('getPostStatistics', () => {
        it('should get Post Statistics', async () => {
            const usersPostStatistics = {
                "post_id": 4,
                "post_description": "Eu dando mortal",
                "created_at": "2022-03-05T15:00:00.000Z",
                "author": {
                    "id": 22,
                    "name": "Eduardo Lima"
                },
                "reactions": {
                    "sad": 0,
                    "wow": 1,
                    "love": 0,
                    "angry": 0,
                    "hahah": 0,
                    "likes": 2
                },
                "comment_quantity": 0
            };
            const mockStatistics = { };
            mockUserRepository.getPostStatistics.mockResolvedValueOnce(usersPostStatistics);
            const expectPostStatistics = await userService.getPostStatistics();
            expect(mockUserRepository.getPostStatistics).toHaveBeenCalledWith();
            expect(expectPostStatistics).toEqual(usersPostStatistics);
        });
        it('shouldnt get Post Statistics', async () => {
            mockUserRepository.getPostStatistics.mockResolvedValueOnce(false);
            await expect(userService.getPostStatistics()).rejects.toThrowError(new ApiError(httpStatus.NOT_FOUND, 'No post statistics was found!'));
            expect(mockUserRepository.getPostStatistics).toHaveBeenCalled();
        });
    });
});

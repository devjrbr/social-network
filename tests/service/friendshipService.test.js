const FriendshipService = require('../../src/services/friendshipServices');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn()
};

describe('FriendshipService', () => {
    let friendshipService;
    let createdFriendship;
    beforeEach(() => {
        friendshipService = new FriendshipService(mockRepository);
        createdFriendship = {
            "id": 1,
            "principal_user_id": 1,
            "friend_id": 2,
            "is_active": true
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createFriendship', () => {
        it('should create a friendship', async () => {
            mockRepository.create.mockResolvedValueOnce(createdFriendship);
            const friendship = await friendshipService.create(1, 2);
            expect(mockRepository.create).toHaveBeenCalledWith(1, 2);
            expect(friendship).toEqual(createdFriendship);
        });
    });
    describe('createFriendship', () => {
        it('should not create a friendship', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship'));

            await expect(friendshipService.create(1, 2)).rejects.toThrowError('Error while creating friendship');
            expect(mockRepository.create).toHaveBeenCalledWith(1, 2);
        });
    });
    describe('getAllFriendships', () => {
        it('should get all friendships', async () => {
            const returnedValues = [
                {
                    "id": 1,
                    "principal_user_id": 1,
                    "friend_id": 2,
                    "is_active": true
                },
                {
                    "id": 2,
                    "principal_user_id": 2,
                    "friend_id": 3,
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(returnedValues);
            const result = await friendshipService.getAllFriendships();
            expect(mockRepository.getAll).toHaveBeenCalled();
            expect(result).toEqual(returnedValues);
        });
    });
    describe('deleteFriendship', () => {
        it('should delete an existing friendship', async () => {
            const existingFriendshipId = 1;
            mockRepository.getById.mockResolvedValueOnce({});
            await friendshipService.deleteFriendship(existingFriendshipId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingFriendshipId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingFriendshipId);
        });
        it('should throw an error when trying to delete a non-existing friendship', async () => {
            const nonExistingFriendshipId = 1000;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(friendshipService.deleteFriendship(nonExistingFriendshipId)).rejects.toThrowError('Friendship not found.');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingFriendshipId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

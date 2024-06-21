const ReactionService = require('../../src/services/reactionService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};

describe('ReactionService', () => {
    let reactionService;
    let reactionValue;
    beforeEach(() => {
        reactionService = new ReactionService(mockRepository);
        reactionValue = {
            "id": 1,
            "user_id": 2,
            "reaction_type_id": 3,
            "post_id": 4,
            "is_active": true
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createReaction', () => {
        it('should create a reaction', async () => {
            mockRepository.create.mockResolvedValueOnce(reactionValue);
            const reaction = await reactionService.createReaction(2, 3, 4);
            expect(mockRepository.create).toHaveBeenCalledWith(2, 3, 4);
            expect(reaction).toEqual(reactionValue);
        });
    });
    describe('createReaction', () => {
        it('shouldnt create a reaction', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction'));
            await expect(reactionService.createReaction(2, 3, 4)).rejects.toThrowError('Error while creating reaction');
            expect(mockRepository.create).toHaveBeenCalledWith(2, 3, 4);
        });
    });
    describe('getAllReactions', () => {
        it('should get all reactions', async () => {
            const reactionValues = [
                {
                    "id": 1,
                    "user_id": 1,
                    "reaction_type_id": 1,
                    "post_id": 1,
                    "is_active": true
                },
                {
                    "id": 2,
                    "user_id": 2,
                    "reaction_type_id": 2,
                    "post_id": 2,
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(reactionValues);
            const result = await reactionService.getAllReactions();
            expect(result).toEqual(reactionValues);
        });
    });
    describe('getReactionById', () => {
        it('should get a reaction by ID', async () => {
            const reactionId = 1;
            mockRepository.getById.mockResolvedValueOnce(reactionValue);
            const result = await reactionService.getReactionById(reactionId);
            expect(result).toEqual(reactionValue);
        });
        it('should throw an error when reaction not found by ID', async () => {
            const reactionId = 345;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(reactionService.getReactionById(reactionId)).rejects.toThrowError('Reaction not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(reactionId);
        });
    });
    describe('updateReaction', () => {
        it('should update an existing reaction', async () => {
            const existingReactionId = 1;
            const updatedUserId = 2;
            const updatedReactionTypeId = 3;
            const updatedPostId = 4;
            mockRepository.getById.mockResolvedValueOnce({ id: existingReactionId });
            await reactionService.updateReaction(existingReactionId, updatedUserId, updatedReactionTypeId, updatedPostId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingReactionId);
            expect(mockRepository.update).toHaveBeenCalledWith(existingReactionId, updatedUserId, updatedReactionTypeId, updatedPostId);
        });
        it('should throw an error when trying to update a non-existing reaction', async () => {
            const nonExistingReactionId = 234;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(reactionService.updateReaction(nonExistingReactionId, 2, 3, 4)).rejects.toThrowError('Reaction not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingReactionId);
            expect(mockRepository.update).not.toHaveBeenCalled();
        });
    });
    describe('deleteReaction', () => {
        it('should delete an existing reaction', async () => {
            const existingReactionId = 1;
            mockRepository.getById.mockResolvedValueOnce({ id: existingReactionId });
            await reactionService.deleteReaction(existingReactionId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingReactionId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingReactionId);
        });
        it('should throw an error when trying to delete a non-existing reaction', async () => {
            const nonExistingReactionId = 111; // Non-existing reaction ID
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(reactionService.deleteReaction(nonExistingReactionId)).rejects.toThrowError('Reaction not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingReactionId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

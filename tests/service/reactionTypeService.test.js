const ReactionTypeService = require('../../src/services/reactionTypeService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn()
};
describe('ReactionTypeService', () => {
    let reactionTypeService;
    let reactionTypeValues;
    let existingReactionTypeId;
    beforeEach(() => {
        reactionTypeService = new ReactionTypeService(mockRepository);
        reactionTypeValues = {
            "id": 1,
            "description": "Like",
            "is_active": true
        };
        existingReactionTypeId = 1;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createReactionType', () => {
        it('should create a reaction type', async () => {

            mockRepository.create.mockResolvedValueOnce(reactionTypeValues);
            const reactionType = await reactionTypeService.createReactionType("Like");
            expect(mockRepository.create).toHaveBeenCalledWith("Like");
            expect(reactionType).toEqual(reactionTypeValues);
        });
    });
    describe('createReactionType', () => {
        it('shouldnt create a reaction type', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction type'));
            await expect(reactionTypeService.createReactionType("Like")).rejects.toThrowError('Error while creating reaction type');
            expect(mockRepository.create).toHaveBeenCalledWith("Like");
        });
    });
    describe('getAllReactionsType', () => {
        it('should get all reaction types', async () => {
            const reactionTypeValues = [
                {
                    "id": 1,
                    "description": "Like",
                    "is_active": true
                },
                {
                    "id": 2,
                    "description": "Love",
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(reactionTypeValues);
            const result = await reactionTypeService.getAllReactionsType();
            expect(result).toEqual(reactionTypeValues);
        });
    });
    describe('deleteReactionType', () => {
        it('should delete an existing reaction type', async () => {

            mockRepository.getById.mockResolvedValueOnce(existingReactionTypeId);
            await reactionTypeService.deleteReactionType(existingReactionTypeId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingReactionTypeId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingReactionTypeId);
        });
        it('should throw an error when trying to delete a non-existing reaction type', async () => {
            const nonExistingReactionTypeId = null;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(reactionTypeService.deleteReactionType(nonExistingReactionTypeId)).rejects.toThrowError('Reaction type not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingReactionTypeId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

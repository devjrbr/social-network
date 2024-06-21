const TargetPublicService = require('../../src/services/targetPublicService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn()
};
describe('TargetPublicService', () => {
    let targetPublicService;
    let targetPublicValue;
    beforeEach(() => {
        targetPublicService = new TargetPublicService(mockRepository);
        targetPublicValue = {
            "id": 1,
            "type": "Public",
            "is_active": true
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createTargetPublic', () => {
        it('should create a target public', async () => {
            mockRepository.create.mockResolvedValueOnce(targetPublicValue);
            const targetPublic = await targetPublicService.createTargetPublic("Public");
            expect(mockRepository.create).toHaveBeenCalledWith("Public");
            expect(targetPublic).toEqual(targetPublicValue);
        });
    });
    describe('createTargetPublic', () => {
        it('shouldnt create a target public', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating target public'));
            await expect(targetPublicService.createTargetPublic("Public")).rejects.toThrowError('Error while creating target public');
            expect(mockRepository.create).toHaveBeenCalledWith("Public");
        });
    });
    describe('getAllTargetPublic', () => {
        it('should get all target public', async () => {
            const targetPublicValues = [
                {
                    "id": 1,
                    "type": "Public",
                    "is_active": true
                },
                {
                    "id": 2,
                    "type": "Private",
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(targetPublicValues);
            const result = await targetPublicService.getAllTargetPublic();
            expect(result).toEqual(targetPublicValues);
        });
    });
    describe('getById', () => {
        it('should get a target public by ID', async () => {
            const targetPublicId = 1;
            mockRepository.getById.mockResolvedValueOnce(targetPublicValue);
            const result = await targetPublicService.getById(targetPublicId);
            expect(result).toEqual(targetPublicValue);
        });
        it('should throw an error when target public not found by ID', async () => {
            const targetPublicId = 96;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(targetPublicService.getById(targetPublicId)).rejects.toThrowError('Target public not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(targetPublicId);
        });
    });
    describe('deleteTargetPublic', () => {
        it('should delete an existing target public', async () => {
            const existingTargetPublicId = 1;
            mockRepository.getById.mockResolvedValueOnce({ id: existingTargetPublicId });
            await targetPublicService.deleteTargetPublic(existingTargetPublicId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingTargetPublicId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingTargetPublicId);
        });
        it('should throw an error when trying to delete a non-existing target public', async () => {
            const nonExistingTargetPublicId = 77;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(targetPublicService.deleteTargetPublic(nonExistingTargetPublicId)).rejects.toThrowError('Target public not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingTargetPublicId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

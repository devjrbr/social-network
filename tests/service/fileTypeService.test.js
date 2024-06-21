const FileTypeService = require('../../src/services/fileTypeService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn()
};

describe('FileTypeService', () => {
    let fileTypeService;
    let fileTypeValue;
    beforeEach(() => {
        fileTypeService = new FileTypeService(mockRepository);
        fileTypeValue = {
            "id": 1,
            "type": "png",
            "is_active": true
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createFileType', () => {
        it('should create a file type', async () => {
            mockRepository.create.mockResolvedValueOnce(fileTypeValue);
            const fileType = await fileTypeService.createFileType("png");
            expect(mockRepository.create).toHaveBeenCalledWith("png");
            expect(fileType).toEqual(fileTypeValue);
        });
    });
    describe('createFileType', () => {
        it('shouldnt create a file type', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating file type'));
            await expect(fileTypeService.createFileType("png")).rejects.toThrowError('Error while creating file type');
            expect(mockRepository.create).toHaveBeenCalledWith("png");
        });
    });
    describe('getAllFileType', () => {
        it('should get all file types', async () => {
            const fileTypeValues = [
                {
                    "id": 1,
                    "type": "png",
                    "is_active": true
                },
                {
                    "id": 2,
                    "type": "mp4",
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(fileTypeValues);
            const result = await fileTypeService.getAllFileType();
            expect(result).toEqual(fileTypeValues);
        });
    });
    describe('getFileTypeById', () => {
        it('should get a file type by ID', async () => {
            const fileTypeId = 1;
            mockRepository.getById.mockResolvedValueOnce(fileTypeValue);
            const result = await fileTypeService.getById(fileTypeId);
            expect(result).toEqual(fileTypeValue);
        });

        it('should throw an error when file type not found by ID', async () => {
            const fileTypeId = 78;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(fileTypeService.getById(fileTypeId)).rejects.toThrowError('File type not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(fileTypeId);
        });
    });
    describe('deleteFileType', () => {
        it('should delete an existing file type', async () => {
            const existingFileTypeId = 1;
            mockRepository.getById.mockResolvedValueOnce({ id: existingFileTypeId });
            await fileTypeService.deleteFileType(existingFileTypeId);
            expect(mockRepository.getById).toHaveBeenCalledWith(existingFileTypeId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingFileTypeId);
        });
        it('should throw an error when trying to delete a non-existing file type', async () => {
            const nonExistingFileTypeId = 98;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(fileTypeService.deleteFileType(nonExistingFileTypeId)).rejects.toThrowError('File type not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingFileTypeId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

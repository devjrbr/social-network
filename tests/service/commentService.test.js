const CommentsService = require('../../src/services/commentService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};
describe('CommentsService', () => {
    let commentsService;
    let commentValue;
    let commentId;
    beforeEach(() => {
        commentsService = new CommentsService(mockRepository);
        commentValue = {
            "id": 2,
            "description": "Essa montanha russa é braba",
            "user_id": 5,
            "post_id": 2,
            "is_active": true
        };
        commentId = 1;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createComment', () => {
        it('should create a comment', async () => {
            mockRepository.create.mockResolvedValueOnce(commentValue);
            const comment = await commentsService.create("Essa montanha russa é braba", 5, 2);
            expect(mockRepository.create).toHaveBeenCalledWith("Essa montanha russa é braba", 5, 2);
            expect(comment).toEqual(commentValue);
        });
    });
    describe('createComment', () => {
        it('shouldnt create a comment', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating comment'));
            await expect(commentsService.create("Essa montanha russa é braba", 5, 2)).rejects.toThrowError('Error while creating comment');
            expect(mockRepository.create).toHaveBeenCalledWith("Essa montanha russa é braba", 5, 2);
        });
    });
    describe('getAllComments', () => {
        it('should get all comments', async () => {
            const commentValues = [
                {
                    "id": 2,
                    "description": "Essa montanha russa é braba",
                    "user_id": 5,
                    "post_id": 2,
                    "is_active": true
                },
                {
                    "id": 3,
                    "description": "Já teve vários acidentes com jacaré aí",
                    "user_id": 4,
                    "post_id": 3,
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(commentValues);
            const result = await commentsService.getAllComments();
            expect(result).toEqual(commentValues);
        });
    });
    describe('getCommentById', () => {
        it('should get a comment by ID', async () => {
            const commentId = 1;
            mockRepository.getById.mockResolvedValueOnce(commentValue);
            const result = await commentsService.getCommentById(commentId);
            expect(result).toEqual(commentValue);
        });
        it('should throw an error when comment not found by ID', async () => {
            const commentId = 125; // Non-existing comment ID
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(commentsService.getCommentById(commentId)).rejects.toThrowError('Comment not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(commentId);
        });
    });
    describe('updateComment', () => {
        it('should update an existing comment by ID', async () => {
            const updatedDescription = "Andando por New York";
            const updatedUserId = 2;
            const updatedPostId = 3;
            mockRepository.getById.mockResolvedValueOnce({ id: commentId });
            await commentsService.updateComment(commentId, updatedDescription, updatedUserId, updatedPostId);
            expect(mockRepository.getById).toHaveBeenCalledWith(commentId);
            expect(mockRepository.update).toHaveBeenCalledWith(commentId, updatedDescription, updatedUserId, updatedPostId);
        });
        it('should throw an error when trying to update a non-existing comment', async () => {
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(commentsService.updateComment(commentId, "Andando por New York", 2, 3)).rejects.toThrowError('Comment not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(commentId);
            expect(mockRepository.update).not.toHaveBeenCalled();
        });
    });
    describe('deleteComment', () => {
        it('should delete an existing comment', async () => {
            mockRepository.getById.mockResolvedValueOnce({ id: commentId });
            await commentsService.deleteComment(commentId);
            expect(mockRepository.getById).toHaveBeenCalledWith(commentId);
            expect(mockRepository.delete).toHaveBeenCalledWith(commentId);
        });
        it('should throw an error when trying to delete a non-existing comment', async () => {
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(commentsService.deleteComment(commentId)).rejects.toThrowError('Comment not found');
            expect(mockRepository.getById).toHaveBeenCalledWith(commentId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

const PostService = require('../../src/services/postService');
const httpStatus = require('../../src/utils/statusCodes');
const ApiError = require("../../src/utils/ApiError");

const mockRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};
describe('PostService', () => {
    let postService;
    let createdPost;
    beforeEach(() => {
        postService = new PostService(mockRepository);
        createdPost = {
            "id": 1,
            "description": "slc",
            "user_id": 1,
            "target_id": 2,
            "type_id": 1,
            "is_active": true
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createPost', () => {
        it('should create a post', async () => {
            mockRepository.create.mockResolvedValueOnce(createdPost);
            const post = await postService.createPost("Sample post", 1, 2, 1);
            expect(mockRepository.create).toHaveBeenCalledWith("Sample post", 1, 2, 1);
            expect(post).toEqual(createdPost);
        });
    });
    describe('createPost', () => {
        it('should not create a post', async () => {
            mockRepository.create.mockRejectedValueOnce(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating post'));

            await expect(postService.createPost("Sample post", 1, 2, 1)).rejects.toThrowError('Error while creating post');
            expect(mockRepository.create).toHaveBeenCalledWith("Sample post", 1, 2, 1);
        });
    });
    describe('getAllPosts', () => {
        it('should get all posts', async () => {
            const returnedValues = [
                {
                    "id": 1,
                    "description": "show",
                    "user_id": 1,
                    "target_id": 2,
                    "type_id": 1,
                    "is_active": true
                },
                {
                    "id": 2,
                    "description": "slccc",
                    "user_id": 2,
                    "target_id": 1,
                    "type_id": 1,
                    "is_active": true
                }
            ];
            mockRepository.getAll.mockResolvedValueOnce(returnedValues);
            const result = await postService.getAllPosts();
            expect(mockRepository.getAll).toHaveBeenCalled();
            expect(result).toEqual(returnedValues);
        });
    });
    describe('deletePost', () => {
        it('should delete an existing post', async () => {
            const existingPostId = 1;
            mockRepository.getById.mockResolvedValueOnce({});

            await postService.deletePost(existingPostId);

            expect(mockRepository.getById).toHaveBeenCalledWith(existingPostId);
            expect(mockRepository.delete).toHaveBeenCalledWith(existingPostId);
        });
        it('should throw an error when trying to delete a non-existing post', async () => {
            const nonExistingPostId = 1000;
            mockRepository.getById.mockResolvedValueOnce(null);
            await expect(postService.deletePost(nonExistingPostId)).rejects.toThrowError('Post not found.');
            expect(mockRepository.getById).toHaveBeenCalledWith(nonExistingPostId);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });
    });
});

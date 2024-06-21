const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing friendship request type feature', () => {
    let tempFriendshipRequestType;
    let bodyFriendshipRequestTypeCreateTest;
    
    beforeAll(async () => {
        const [id] = await db('friendship_request_type').insert({
            type: 'best_friend'            
        });
        
        tempFriendshipRequestType = { id };
        bodyFriendshipRequestTypeCreateTest = {
            type: 'close_friend'
        };
    });

    afterAll(async () => {
        await db('friendship_request_type').del();
        await db.destroy();
    });

    it('Should return a list of friendship request types', async () => {
        const friendshipRequestTypes = await request(app).get('/friendship_request_type');
        expect(friendshipRequestTypes.status).toBe(httpStatus.OK);
        expect(Array.isArray(friendshipRequestTypes.body)).toBe(true);
        expect(friendshipRequestTypes.body).toBeDefined();
    });

    it('Should create a friendship request type', async () => {
        const friendshipRequestType = await request(app).post('/friendship_request_type').send(bodyFriendshipRequestTypeCreateTest);
        expect(friendshipRequestType.status).toBe(httpStatus.CREATED);
        expect(friendshipRequestType.body).toBeDefined();
    });

    it('Should get a friendship request type by ID', async () => {
        const friendshipRequestType = await request(app).get(`/friendship_request_type/${tempFriendshipRequestType.id}`);
        expect(friendshipRequestType.status).toBe(httpStatus.OK);
        expect(friendshipRequestType.body).toBeDefined();
        expect(friendshipRequestType.body.id).toBe(tempFriendshipRequestType.id);
    });

    it('Should delete a friendship request type', async () => {
        const friendshipRequestType = await request(app).delete(`/friendship_request_type/${tempFriendshipRequestType.id}`);
        expect(friendshipRequestType.status).toBe(httpStatus.OK);
    });

    it('Should not create a friendship request type with invalid request body', async () => {
        const friendshipRequestType = await request(app).post('/friendship_request_type').send({});
        expect(friendshipRequestType.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('Should not delete a friendship request type that does not exist', async () => {
        const friendshipRequestType = await request(app).delete('/friendship_request_type/100000');
        expect(friendshipRequestType.status).toBe(httpStatus.NOT_FOUND);
    });
});

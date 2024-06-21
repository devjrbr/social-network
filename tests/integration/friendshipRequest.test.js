const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing FriendshipRequest feature', () => {
    let loggedUser;
    let receiverFriendshipRequestUser;
    let loginResponse;
    let tempUser;
    beforeAll(async () => {
        await db('user').insert({
            id: 10000,
            full_name: 'Sender',
            email: 'sender@gmail.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        loggedUser = await db('user').where({ id: 10000 }).first();
        loginResponse = await request(app).post('/login').send({"email": loggedUser.email, "password": "1234"});
        await db('user').insert({
            id: 20000,
            full_name: 'Receiver',
            email: 'receiver@example.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        receiverFriendshipRequestUser = await db('user').where({ id: 20000 }).first();
    });
    afterAll(async () => {
        await db('friendship_request').where({ sender_id: loggedUser.id, receiver_id: receiverFriendshipRequestUser.id }).del();
        await db('friendship').where({ principal_user_id: loggedUser.id, friend_id: receiverFriendshipRequestUser.id }).del();
        await db('token').where({ user_id: loggedUser.id }).del();
        await db('user').where({ id: loggedUser.id }).del();
        await db('user').where({ id: receiverFriendshipRequestUser.id }).del();
    });
    it('Should send a friendship request', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .post('/friendship_request')
            .set('authorization', token)
            .send({"receiver_id": receiverFriendshipRequestUser.id});
        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Friendship request sent successfully!');
    });
    it('Should return all friendship requests of a user', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .get('/friendship_request')
            .set('authorization', token);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
    });
    it('Should accept a friendship request received', async () => {
        const senderUserId = receiverFriendshipRequestUser.id
        const { token } = loginResponse.body;
        await db('friendship_request').insert({
            id: 11111,
            sender_id: senderUserId,
            receiver_id: loggedUser.id,
            request_type_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        });
        const response = await request(app)
            .put('/friendship_request/11111')
            .set('authorization', token)
            .send({"sender_id": senderUserId});
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Friendship request accepted successfully!');
    });
    it('Should reject a friendship request received', async () => {
        const senderUserId = receiverFriendshipRequestUser.id
        const { token } = loginResponse.body;
        await db('friendship_request').insert({
            id: 22222,
            sender_id: senderUserId,
            receiver_id: loggedUser.id,
            request_type_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        });
        const response = await request(app)
            .delete('/friendship_request/22222')
            .set('authorization', token);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Friendship request rejected successfully!');
    });
});

const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing friendship feature', () => {
    let tempFriendship;
    let tempUserPrincipal;
    let tempUserFriend;
    let loginResponse;
    let tempFriendshipBodyCreated;

    beforeAll(async () => {
        [tempUserPrincipal] = await db('user').insert({
            full_name: 'Bebeto do Flamengo',
            email: 'flamenguinhodojapa@example.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        tempUserPrincipal = await db('user').where({id: tempUserPrincipal}).first();

        [tempUserFriend] = await db('user').insert({
            full_name: 'Menino sagaz',
            email: 'meninosagazdelas@example.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        tempUserFriend = await db('user').where({id: tempUserFriend}).first();

        [friendshipId] = await db('friendship').insert({
            principal_user_id: tempUserPrincipal.id,
            friend_id: tempUserFriend.id,
            created_at: new Date(),
            updated_at: new Date()
        })

        loginResponse= await request(app).post('/login').send({email: tempUserPrincipal.email, password: "1234"});
    });
    afterAll(async () => {
        await db('token').del();
        await db('friendship').del();
        await db('user').where({ id: tempUserPrincipal }).del();
        await db('user').where({ id: friendshipId }).del();
        await db.destroy();
    });

    it('Should return a list of friendship', async () => {
        const {token} = loginResponse.body;
        const friendship = await request(app).get('/friendship').set('Authorization', token);
        expect(friendship.status).toBe(httpStatus.OK);
        expect(friendship.body).toBeDefined();
    });

    it('Should delete a friendship', async () => {
        const {token} = loginResponse.body;
        const friendship = await request(app).delete(`/friendship/${friendshipId}`).set('Authorization', token);
        expect(friendship.status).toBe(httpStatus.OK);
    });

    it('Should not delete a non-existent friendship', async () => {
        const {token} = loginResponse.body;
        const friendship = await request(app).delete(`/friendship/${222}`).set('Authorization', token);
        expect(friendship.status).toBe(httpStatus.NOT_FOUND);
    });
});

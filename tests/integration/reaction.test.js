const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing Reaction feature', () => {
    let loggedUser;
    let loginResponse;
    let post;
    let reaction;
    let authorPost;

    beforeAll(async () => {
        // Criar usuário de teste
        await db('user').insert({
            id: 10000,
            full_name: 'Test User',
            email: 'testuser@gmail.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        loggedUser = await db('user').where({ id: 10000 }).first();
        loginResponse = await request(app).post('/login').send({"email": loggedUser.email, "password": "1234"});
        await db('user').insert({
            id: 99999,
            full_name: 'Test User',
            email: 'authorpostuser@gmail.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        authorPost = await db('user').where({ id: 99999 }).first();
        await db('post').insert({
            id: 30000,
            description: 'Test post',
            user_id: 99999,
            target_id: 1,
            type_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        });
        post = await db('post').where({ id: 30000 }).first();
        await db('reaction').insert({
            id: 33333,
            user_id: loggedUser.id,
            reaction_type_id: 1,
            post_id: post.id,
            created_at: new Date(),
            updated_at: new Date()
        });
    });

    afterAll(async () => {
        await db('reaction').where({ id: 33333 }).del();
        await db('reaction').where({ user_id: loggedUser.id }).del();
        await db('post').where({ id: post.id }).del();
        await db('token').where({ user_id: loggedUser.id }).del();
        await db('user').where({ id: loggedUser.id }).del();
        await db('user').where({ id: authorPost.id }).del();
    });
    it('Should create a reaction', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .post('/reactions')
            .set('authorization', token)
            .send({ "reaction_type_id": 1, "post_id": post.id });
        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Reaction created successfully!');
        reaction = response.body.data;
    });
    it('Should get a reaction by id', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .get(`/reactions/33333`)
            .set('authorization', token);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
    });
    it('Should return all reactions of a user', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .get('/reactions')
            .set('authorization', token);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
    });
    it('Should update a reaction', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .put('/reactions/33333')
            .set('authorization', token)
            .send({ "reaction_type_id": 2 });
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
        expect(response.body.details).toBe('Reaction updated successfully');
    });
    it('Should delete a reaction', async () => {
        const { token } = loginResponse.body;
        const response = await request(app)
            .delete('/reactions/33333')
            .set('authorization', token);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toBeDefined();
        expect(response.body.details).toBe('Reaction deleted successfully');
    });
});

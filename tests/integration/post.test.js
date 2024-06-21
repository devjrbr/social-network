const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require("../../src/database/config/db");

describe('Testing post feature', () => {
    let tempUser;
    let loginResponse;
    beforeAll(async () => {
        await db('user').insert({
            id: 100,
            full_name: 'Tadeu Smith',
            email: 'tadeusmit@gmail.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        tempUser = await db('user').where({ id: 100 }).first();
        loginResponse = await request(app).post('/login').send({"email": tempUser.email, "password": "1234"});
        await db(`post`).insert({
            id:200,
            description: "Test Post",
            user_id: tempUser.id,
            target_id: 1,
            type_id: 1
        })
    });
    afterAll(async () => {
        await db('token').where({ user_id: tempUser.id }).del();
        await db('post').where({ id: 200 }).del();
        await db('user').where({ id: tempUser.id }).del();
        await db.destroy();
    });
    it('Should return a list of posts', async () => {
        const { token } = loginResponse.body;
        const posts = await request(app).get('/post').set('Authorization', token);
        expect(posts.status).toBe(httpStatus.OK);
        expect(posts.body).toBeDefined();
    });
    it('Should return a post by id', async () => {
        const { token } = loginResponse.body;
        const post = await request(app).get(`/post/1`).set('Authorization', token);
        expect(post.status).toBe(httpStatus.OK);
        expect(post.body).toBeDefined();
    });
    it('Should create a post', async () => {
        const { token } = loginResponse.body;
        const postData = {
            description: "Test Post",
            target_id: 1,
            type_id: 1
        };
        const post = await request(app).post('/post').send(postData).set('Authorization', token);
        expect(post.status).toBe(httpStatus.CREATED);
        expect(post.body).toBeDefined();
    });
    it('Should delete a post', async () => {
        const { token } = loginResponse.body;
        const post = await request(app).delete(('/post/200')).set('Authorization', token);
        expect(post.status).toBe(httpStatus.OK);
    });
    it('Should not create a post', async () => {
        const { token } = loginResponse.body;
        const post = await request(app).post('/post').send({}).set('Authorization', token);
        expect(post.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should not delete a post', async () => {
        const { token } = loginResponse.body;
        const post = await request(app).delete('/post/100000').set('Authorization', token);
        expect(post.status).toBe(httpStatus.NOT_FOUND);
    });
});

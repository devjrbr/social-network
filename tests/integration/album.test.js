const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing album feature', () => {
    let tempAlbum;
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

        await db(`album`).insert({
            id: 1000,
            description: "Test Album",
            target_id: 1,
            is_active: true
        })
        tempAlbum = await db('album').where({ id: 1000 }).first();
    });
    afterAll(async () => {
        await db('token').where({ user_id: tempUser.id }).del();
        await db('user').where({ id: tempUser.id }).del();
        await db('album').where({ id: tempAlbum.id }).del();
        await db.destroy();
    });
    it('Should return a list of albums', async () => {
        const { token } = loginResponse.body;
        const albums = await request(app).get('/album').set('Authorization', token);
        expect(albums.status).toBe(httpStatus.OK);
        expect(albums.body).toBeDefined();
    });
    it('Should return an album by id', async () => {
        const { token } = loginResponse.body;
        const album = await request(app).get('/album/1000').set('Authorization', token);
        expect(album.status).toBe(httpStatus.OK);
        expect(album.body).toBeDefined();
    });
    it('Should create an album', async () => {
        const album = await request(app).post('/album').send({
            description: "Rolê",
            target_id: 1
        });
        expect(album.status).toBe(httpStatus.CREATED);
        expect(album.body).toBeDefined();
    });
    it('Should delete an album', async () => {
        const { token } = loginResponse.body;
        const album = await request(app).delete('/album/1000').set('Authorization', token);
        expect(album.status).toBe(httpStatus.OK);
    });
    it('Should return a not found if trying to delete an album with non-existent id', async () => {
        const { token } = loginResponse.body;
        const album = await request(app).delete('/album/100000').set('Authorization', token);
        expect(album.status).toBe(httpStatus.NOT_FOUND);
    });
});

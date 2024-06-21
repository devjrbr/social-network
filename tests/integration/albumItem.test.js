const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');
describe('Testing album item feature', () => {
    let tempAlbumItem;
    let bodyAlbumItem;
    let tempUser;
    let loginResponse;

    beforeAll(async () => {
        await db('user').insert({
            id: 1000,
            full_name: 'Mc Carol',
            email: 'carolsobrepeso2000@gmail.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        }) 
        tempUser = await db('user').where({ id: 1000 }).first();

        await db('album').insert({
            id: 1000,
            description: "Test Album",
            target_id: 1,
            is_active: true
        })
        await db('post').insert({
            id: 1000,
            description: "Test Post",
            user_id: 1000,
            target_id: 1,
            type_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        })
        await db('album_item').insert({
            id:1000,
            post_id: 1000,
            album_id: 1000,
            created_at: new Date(),
            updated_at: new Date()
        })

        loginResponse = await request(app).post('/login').send({ email: tempUser.email, password: "1234" });       
    });

    afterAll(async () => {
        await db('token').where({ user_id: tempUser.id }).del();
        await db('album').where({ id: 1000 }).del();
        await db('album_item').where({ id: 1000 }).del();
        await db('post').where({ id: 1000 }).del();
        await db('user').where({ id: 1000 }).del();
        await db.destroy();
    });
    it('Should return a list of album items', async () => {
        const { token } = loginResponse.body;
        const albumItems = await request(app).get('/album_item').set('Authorization', token);
        expect(albumItems.status).toBe(httpStatus.OK);
        expect(albumItems.body).toBeDefined();
    });
    it('Should create an album item', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).post('/album_item').send({
            post_id: 1000,
            album_id: 1000
        }).set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.CREATED);
        expect(albumItem.body).toBeDefined();
    });
    it('Should delete an album item', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).delete('/album_item/1000').set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.OK);
    });
    it('Should not delete an album item', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).delete('/album_item/100000').set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.NOT_FOUND);
    });
});

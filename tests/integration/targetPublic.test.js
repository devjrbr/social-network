// tests/integration/targetPublic.test.js
const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing target public feature', () => {
    let tempTargetPublic;
    let bodyTargetPublicCreateTest;
    beforeAll(async () => {
        const [id] = await db('target_public').insert({
            type: "test",
            is_active: true
        });
        tempTargetPublic = { id };
        bodyTargetPublicCreateTest = { type: "test" };
    });
    afterAll(async () => {
        await db('target_public').del();
        await db.destroy();
    });

    it('Should return a list of target public', async () => {
        const targetPublic = await request(app).get('/target_public');
        expect(targetPublic.status).toBe(httpStatus.OK);
        expect(Array.isArray(targetPublic.body)).toBe(true);
        expect(targetPublic.body).toBeDefined();
    });

    it('Should create a target public', async () => {
        const targetPublic = await request(app).post('/target_public').send(bodyTargetPublicCreateTest);
        expect(targetPublic.status).toBe(httpStatus.CREATED);
        expect(targetPublic.body).toBeDefined();
    });

    it('Should delete a target public', async () => {
        const targetPublic = await request(app).delete(`/target_public/${tempTargetPublic.id}`);
        expect(targetPublic.status).toBe(httpStatus.OK);
    });

    it('Should not create a target public with missing data', async () => {
        const targetPublic = await request(app).post('/target_public').send({});
        expect(targetPublic.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    });

    it('Should not delete a non-existing target public', async () => {
        const targetPublic = await request(app).delete('/target_public/100000');
        expect(targetPublic.status).toBe(httpStatus.NOT_FOUND);
    });
});

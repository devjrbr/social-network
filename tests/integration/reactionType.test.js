const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db'); // Assumindo que você configurou o Knex aqui


describe('Testing reaction type feature', () => {
    let tempReactionType;
    beforeAll(async () => {
        await db('reaction_type').insert({
            id:1000,
            description: "test",
            is_active: true
        });
        tempReactionType = await db('reaction_type').where({ id: 1000 }).first();
    });

    afterAll(async () => {
        await db('reaction_type').del();
        await db.destroy();
    });

    it('Should return a list of reaction types', async () => {
        const reactionTypes = await request(app).get('/reactions_type');
        expect(reactionTypes.status).toBe(httpStatus.OK);
        expect(Array.isArray(reactionTypes.body)).toBe(true);
        expect(reactionTypes.body).toBeDefined();
    });

    it('Should create a reaction type', async () => {
        const reactionType = await request(app).post('/reactions_type').send({ description: "test" });
        expect(reactionType.status).toBe(httpStatus.CREATED);
        expect(reactionType.body).toBeDefined();
    });

    it('Should delete a reaction type', async () => {
        const reactionType = await request(app).delete(`/reactions_type/${tempReactionType.id}`);
        expect(reactionType.status).toBe(httpStatus.OK);
    });

    it('Should not create a reaction type', async () => {
        const reactionType = await request(app).post('/reactions_type').send({});
        expect(reactionType.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('Should not delete a reaction type', async () => {
        const reactionType = await request(app).delete('/reactions_type/100000');
        expect(reactionType.status).toBe(httpStatus.NOT_FOUND);
    });
});

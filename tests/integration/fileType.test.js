const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');

describe('Testing FileType feature', () => {
    let tempFileType;
    let bodyFileType;
    beforeAll(async () => {
        await db('file_type').insert({
            id:10000,
            type: 'test',
            is_active: true
        });
        tempFileType = await db('file_type').where({ id: 10000 }).first();
        await db('file_type').insert({
            id:2000,
            type: 'png',
            is_active: true
        });
        bodyFileType = await db('file_type').where({ id: 10000 }).first();
    });
    afterAll(async () => {
        await db('file_type').where({ id: tempFileType.id }).del();
        await db('file_type').where({ id: bodyFileType.id }).del();
        await db.destroy();
    });
    it('Should return a list of file types', async () => {
        const fileTypes = await request(app).get('/file_type');
        expect(fileTypes.status).toBe(httpStatus.OK);
        expect(Array.isArray(fileTypes.body)).toBe(true);
        expect(fileTypes.body).toBeDefined();
    });
    it('Should create a file type', async () => {
        const fileType = await request(app).post('/file_type').send(bodyFileType);
        expect(fileType.status).toBe(httpStatus.CREATED);
        expect(fileType.body).toBeDefined();
    });
    it('Should delete a file type', async () => {
        const fileType = await request(app).delete(`/file_type/${tempFileType.id}`);
        expect(fileType.status).toBe(httpStatus.OK);
    });

});

const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require("../../src/database/config/db");

describe('Testing user feature', () => {
  let tempUser;
  let loginResponse;
  let bodyUser;
  beforeAll(async () => {
    await db('user').insert({
      id: 10000,
      full_name: 'Tadeu Smith',
      email: 'tads@gmail.com',
      password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    });
    tempUser = await db('user').where({ id: 10000 }).first();
    loginResponse = await request(app).post('/login').send({"email": tempUser.email, "password": "1234"});
    bodyUser = {
      full_name: 'Tadeuzinho Smith',
      email: 'tadeusmiit@gmail.com'
    };
  });
  afterAll(async () => {
    await db('token').where({ user_id: tempUser.id }).del();
    await db('user').where({ id: tempUser.id }).del();
  });
  it('Should return all users when authorized with valid token', async () => {
      const { token } = loginResponse.body;
      const users = await request(app).get('/users').set('Authorization', token);
      expect(users.status).toBe(200);
      expect(users.body).toBeDefined();
  });
  it('Should return a user by id when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const user = await request(app).get(`/users/${tempUser.id}`).set('Authorization', token);
    expect(user.status).toBe(httpStatus.OK);
    expect(user.body).toBeDefined();
  });
  it('Should authenticate a user using a email and password correctly', async () => {
    const login = await request(app).post('/login').send({"email": tempUser.email, "password": "1234"});
    expect(login.status).toBe(httpStatus.OK);
    expect(login.body.token).toBeDefined();
    expect(login.body.refreshToken).toBeDefined();
  });
  it('Should update a user when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const updatedUser = await request(app).put(`/users/${tempUser.id}`).send(bodyUser).set('Authorization', token);
    expect(updatedUser.status).toBe(httpStatus.OK);
    expect(updatedUser.body.details).toBe('User updated successfully');
  });
  it('Should delete a user when authorized with valid token', async () => {
    const { token } = await loginResponse.body;
    const deletedUser = await request(app).delete(`/users`).set('Authorization', token);
    expect(deletedUser.status).toBe(200);
    expect(deletedUser.body.details).toBe('User deleted successfully');
  });
  it('Should return a bad request if trying to update a user sending a empty body', async () => {
    const { token } = await loginResponse.body;
    const updatedUser = await request(app).put(`/users/${tempUser.id}`).send({}).set('Authorization', token);
    expect(updatedUser.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });
  it('Should return invalid email or password if trying to login using an incorrect email or password', async () => {
    const { token } = await loginResponse.body;
    const login = await request(app).post('/login').send({ email: 'testando@gmail.com', password: '3213' }).set('Authorization', token);
    expect(login.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('Should return a not found if trying to delete an user with non-existent id', async () => {
    const { token } = await loginResponse.body;
    const user = await request(app).get(`/users/${10000000000}`).set('Authorization', token);
    expect(user.status).toBe(httpStatus.NOT_FOUND);
  });

  // it('Should return a user feed', async () => {
  //   const userFeed = await request(app).get(`/users/${tempUser.id}/feed`);
  //   expect(userFeed.status).toBe(httpStatus.OK);
  //   expect(userFeed.body.feed).toBeDefined();
  // });
  // it('Should return post statistics', async () => {
  //   const postStatistics = await request(app).get('/users/reports/post-statistics');
  //   expect(postStatistics.status).toBe(httpStatus.OK);
  //   expect(postStatistics.body.post_statistics).toBeDefined();
  // });
});

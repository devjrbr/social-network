const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require("../../src/database/config/db");
const targetPublicStatus = require('../../src/utils/targetPublicStatus');

describe('Testing comment feature', () => {
  let tempUser;
  let tempPost;
  let loginResponse;
  let bodyComment;
  let bodyCreateComment;
  let token;

  beforeAll(async () => {
    await db('user').insert({
      id: 100,
      full_name: 'Luiz Cruz',
      email: 'luizcruzdev@gmail.com',
      password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    });
    tempUser = await db('user').where({ id: 100 }).first();
    await db('post').insert({
      id: 1000,
      description: "Test Post",
      user_id: tempUser.id,
      target_id: targetPublicStatus.PUBLIC,
      type_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    });
    tempPost = await db('post').where({ id: 1000 }).first();
    loginResponse = await request(app).post('/login').send({ email: tempUser.email, password: "1234" });
    token = loginResponse.body.token;
    [bodyComment] = await db('comment').insert(
        {
          id:200,
          description: 'Creating a test comment ',
          user_id: tempUser.id,
          post_id: tempPost.id
        });
    bodyCreateComment = await db('comment').where({ id: 200 }).first();
  });
  afterAll(async () => {
    await db('token').where({ user_id: 100 }).del();
    await db('comment').where({ id: 200 }).del();
    await db('post').where({ id: 1000 }).del();
    await db('user').where({ id: 100 }).del();
  });
  it('Should create a comment when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).post('/comment').send(bodyCreateComment).set('Authorization', token);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.data).toBeDefined();
  });
  it('Should return a bad request if trying to create a comment with missing fields', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).post('/comment').send({}).set('Authorization', token);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it('Should get a comment by id when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).get(`/comment/${tempCommentId}`).set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toBeDefined();
  });
  it('Should get all comments when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).get('/comment').set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toBeDefined();
  });
  it('Should update a comment when authorized with valid token', async () => {
    const updatedCommentData = {
      description: 'This is an updated test comment'
    };
    const response = await request(app).put(`/comment/${tempCommentId}`).send(updatedCommentData).set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.details).toBe('Comment updated successfully');
  });
  it('Should delete a comment when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).delete(`/comment/${tempCommentId}`).set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.details).toBe('Comment deleted successfully');
  });
});

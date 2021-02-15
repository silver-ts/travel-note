const request = require('supertest');
const app = require('../app');
const db = require('./db');
const User = require('../models/User');

// A valid user input
const USER_REQUEST = {
  email: 'example@test.com',
  password: 'password1234',
};

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

// Login tests
describe('POST /api/user/login', () => {
  test('It should response with 200 status', done => {
    request(app)
      .post('/api/user/login')
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});

// Sign Up tests
describe('POST /api/user/signup', () => {
  const agent = request.agent(app);

  test('It should response with 201 status', done => {
    agent
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .then(res => {
        expect(res.statusCode).toBe(201);
        done();
      });
  });

  test('It should store user to db', done => {
    agent
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .expect(201)
      .then(res => {
        expect(res.body.user).toBeTruthy();
        done();
      });
  });

  test('It should throw not unique email error', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Try to sign up using the same email
    await agent
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .expect(400)
      .then(res => {
        expect(res.body.errors.email).toBeTruthy();
        done();
      });
  });

  test('It should throw invalid email error', done => {
    agent
      .post('/api/user/signup')
      .send({
        email: 'test@',
        password: 'password1234',
      })
      .expect(400)
      .then(res => {
        expect(res.body.errors.email).toBeTruthy();
        done();
      });
  });

  test('It should throw invalid input length error', done => {
    agent
      .post('/api/user/signup')
      .send({
        email: 'w',
        password: 'w',
      })
      .expect(400)
      .then(res => {
        expect(res.body.errors.email).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();
        done();
      });
  });
});

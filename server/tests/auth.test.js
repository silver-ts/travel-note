const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Setup connection to the database
beforeAll(async () => await db.connect());
// afterEach(async () => await db.clear());
afterAll(async () => await db.close());

const USER_REQUEST = {
  email: 'example@test.com',
  password: 'password1234',
};

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
  test('It should response with 201 status', done => {
    request(app)
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .then(res => {
        expect(res.statusCode).toBe(201);
        done();
      });
  });

  test('It should store user to db', done => {
    request(app)
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .then(res => {
        expect(JSON.parse(res.text)).toHaveProperty(['_id']);
        done();
      });
  });
});

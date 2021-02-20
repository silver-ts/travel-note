const request = require('supertest');
const app = require('../app');
const db = require('./db');
const User = require('../models/User');

// Pass supertest agent for each test
const agent = request.agent(app);

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
  test('It should return user on login success', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Login with new user credentials
    await agent
      .post('/api/user/login')
      .send(USER_REQUEST)
      .expect(200)
      .then(res => {
        expect(res.body.user).toBeTruthy();
        done();
      });
  });

  test('It should throw incorrect input error', done => {
    agent
      .post('/api/user/login')
      .send(USER_REQUEST)
      .expect(401)
      .then(res => {
        expect(res.body.errors.email).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();
        done();
      });
  });
});

// Sign Up tests
describe('POST /api/user/signup', () => {
  test('It should store user to db and return id', done => {
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


  test('It should create a cookie with JWT access token', async done => {
    let Cookies;

    await agent
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .then(res => {

        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
      });

    const req = agent.get('/');
    req.cookies = Cookies;

    req.end(function(err, res) {
      if (err) {return done(err);}
      expect(res.text).toBe('main page');
      expect(res.status).toBe(200);
      done();
    });
  });

});

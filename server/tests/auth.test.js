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
  test('It should return user & token on login success', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Login with new user credentials
    await agent
      .post('/api/user/login')
      .send(USER_REQUEST)
      .expect(200)
      .then(res => {
        expect(res.body.user.accessToken).toBeTruthy();
        done();
      });
  });

  test('It should throw error when no user exists', done => {
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

  test('It should throw error when email is invalid', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Login with new user credentials
    await agent
      .post('/api/user/login')
      .send({
        email: 'wrong@email.com',
        password: 'password1234',
      })
      .expect(401)
      .then(res => {
        expect(res.body.errors).toBeTruthy();
        expect(res.body.errors.email).toBeTruthy();
        done();
      });
  });

  test('It should throw error when password is invalid', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Login with new user credentials
    await agent
      .post('/api/user/login')
      .send({
        email: 'example@test.com',
        password: 'wrongpassword',
      })
      .expect(401)
      .then(res => {
        expect(res.body.errors).toBeTruthy();
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
      .expect(200)
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


  test('It should create a cookie with JWT refresh token', async done => {
    let Cookies;

    await agent
      .post('/api/user/signup')
      .send(USER_REQUEST)
      .then(res => {

        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
      });

    const req = agent.get('/api/user/');
    req.cookies = Cookies;

    expect(req.cookies).toBeTruthy();
    done();
  });
});

// Refresh token tests
describe('POST /api/user/refresh-token', () => {
  test('It should refresh tokens', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Log in user
    await agent.post('/api/user/login').send(USER_REQUEST);

    // Generate new tokens
    await agent
      .post('/api/user/refresh-token')
      .send(USER_REQUEST)
      .expect(200)
      .then(res => {
        expect(res.body.user.accessToken).toBeTruthy();
        done();
      });
  });

  test('It should return empty access token when not login', done => {
    agent
      .post('/api/user/refresh-token')
      .expect(200)
      .then(res => {
        expect(res.body.user.accessToken).toBeNull();
        done();
      });
  });
});

// Logout tests
describe('POST /api/user/logout', () => {
  test('It should clear cookies and remove token from db', async done => {
    // Create user a new user in db
    await User.create(USER_REQUEST);

    // Log in to generate tokens
    await agent.post('/api/user/login').send(USER_REQUEST);

    // Log out user
    await agent
      .delete('/api/user/logout')
      .expect(200);

    // Should fail when there's no token in db
    await agent
      .post('/api/user/refresh-token')
      .expect(200)
      .then(res => {
        expect(res.body.user.accessToken).toBeNull();
        done();
      });
  });

  test('It should return empty access token when not login', done => {
    agent
      .post('/api/user/refresh-token')
      .expect(200)
      .then(res => {
        expect(res.body.user.accessToken).toBeNull();
        done();
      });
  });
});


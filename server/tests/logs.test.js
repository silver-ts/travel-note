const request = require('supertest');
const app = require('../app');
const db = require('./db');
const User = require('../models/User');

const {
  USER_REQUEST,
  LOG_ENTRY_DATA,
  UPDATED_LOG_ENTRY_DATA,
} = require('./constants');

// Pass supertest agent for each test
const agent = request.agent(app);

// Login user and get accessToken
const getAccessToken = async () => {
  // Create user a new user in db
  await User.create(USER_REQUEST);

  // Login with new user credentials
  const user = await agent
    .post('/api/user/login')
    .send(USER_REQUEST);

  return await user.body.user.accessToken;
};

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/logs/', () => {
  test('It should return 401 when accessToken is not valid', async done => {
    const accessToken = 'not_valid_token';

    await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA)
      .expect(401);

    done();
  });

  test('It should create a new log', async done => {
    const accessToken = await getAccessToken();

    await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA)
      .expect(200)
      .then(res => {
        expect(res.body._id).toBeTruthy();
        done();
      });
  });
});

describe('GET /api/logs/', () => {
  test('It should return 401 when accessToken is not valid', async done => {
    const accessToken = 'not_valid_token';

    await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA)
      .expect(401);

    done();
  });

  test('It should get list of all logs', async done => {
    const accessToken = await getAccessToken();

    // Create example log
    await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA);

    // Get list of 1 log
    await agent
      .get('/api/logs/')
      .set('Authorization', accessToken)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(1);
        done();
      });
  });

  test('It should return an empty list', async done => {
    const accessToken = await getAccessToken();

    await agent
      .get('/api/logs/')
      .set('Authorization', accessToken)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(0);
        done();
      });
  });
});

describe('PUT /api/logs/', () => {
  test('It should return 401 when accessToken is not valid', async done => {
    const accessToken = 'not_valid_token';

    await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA)
      .expect(401);

    done();
  });

  test('It should change logs title', async done => {
    const accessToken = await getAccessToken();

    // Create example log
    const logEntry =  await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA);

    // Edit logs title
    await agent
      .put('/api/logs/')
      .set('Authorization', accessToken)
      .send({ id: logEntry.body._id, data: UPDATED_LOG_ENTRY_DATA })
      .expect(200)
      .then(res => {
        expect(res.body.title).toBe(UPDATED_LOG_ENTRY_DATA.title);
        done();
      });
  });
});

describe('DELETE /api/logs/', () => {
  test('It should return 401 when accessToken is not valid', async done => {
    const accessToken = 'not_valid_token';

    await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA)
      .expect(401);

    done();
  });

  test('It should remove log', async done => {
    const accessToken = await getAccessToken();

    // Create example log
    const logEntry = await agent
      .post('/api/logs/')
      .set('Authorization', accessToken)
      .send(LOG_ENTRY_DATA);

    // Remove log
    await agent
      .delete('/api/logs/')
      .set('Authorization', accessToken)
      .send({ id: logEntry.body._id });

    // Should get an empty list
    await agent
      .get('/api/logs/')
      .set('Authorization', accessToken)
      .expect(200);

    done();
  });
});

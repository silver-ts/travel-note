/**
 * Constants for the tests
 */

const USER_REQUEST = {
  email: 'example@test.com',
  password: 'password1234',
};

const LOG_ENTRY_DATA = {
  title: 'name',
  visitDate: '2021-04-01T00:00:00.000Z',
  content: 'content',
  location: {
    coordinates: [ -58.39101807902855, -9.383104584374555 ],
    place: 'City',
    country: 'Brazil',
    type: 'Point',
  },
};

const UPDATED_LOG_ENTRY_DATA = {
  ...LOG_ENTRY_DATA,
  title: 'new_name',
};

module.exports = {
  USER_REQUEST,
  LOG_ENTRY_DATA,
  UPDATED_LOG_ENTRY_DATA,
};

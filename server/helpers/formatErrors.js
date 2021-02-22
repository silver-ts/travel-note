/**
 * Format error messages for sending to the client UI
 * @param {object} err - error object
 */
module.exports = err => {
  const errors = { email: '', password: '' };

  // Check if user email is unique
  if (err.code === 11000) {
    errors.email = 'This email is already in use';
  }

  // Check if user input is valid
  if (err._message === 'user validation failed') {
    Object.values(err.errors).forEach(err => {
      const { path, message } = err.properties;
      errors[path] = message;
    });
  }

  // Check if login email is registered or password is correct
  if (
    err.message === 'User does not exist' ||
    err.message === 'Password is not correct'
  ) {
    const errorMessage = 'Please enter correct email or password';

    errors.password = errorMessage;
    errors.email = errorMessage;
  }

  return errors;
};

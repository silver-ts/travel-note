const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    maxLength: [254, 'Email is too long'],
    minLength: [3, 'Email is too short'],
    validate: [isEmail, 'Your email is not valid'],
  },
  password: {
    type: String,
    required: true,
    maxLength: [1024, 'Password is too long'],
    minLength: [6, 'Password should be at least 6 characters in length'],
  },
  date: { type: Date, default: Date.now },
  refreshToken: {
    type: String,
    default: null,
  },
});

// Fire function before document saved to the database
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);

  // Save hashed password to the database
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Add static method for login
userSchema.static('login', async function(email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('User doesn\'t exist');
  }

  // Check if password is correct
  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw new Error('Password is not correct');
  }

  // Return only user id
  return user;
});

const User = model('user', userSchema);

module.exports = User;

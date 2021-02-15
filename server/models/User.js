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
});

// Fire function before document saved to the database
// eslint-disable-next-line prettier/prettier
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);

  // Save hashed password to the database
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = model('user', userSchema);

module.exports = User;

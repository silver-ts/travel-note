const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    maxLength: [254, 'email is too long'],
    minLength: [3, 'email is too short'],
    validate: [isEmail, 'email is not valid'],
  },
  password: {
    type: String,
    required: true,
    maxLength: [1024, 'password is too long'],
    minLength: [6, 'password is too short'],
  },
  date: { type: Date, default: Date.now },
});

const User = model('user', userSchema);

module.exports = User;

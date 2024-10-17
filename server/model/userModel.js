const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Please tell us your name.'],
    max: 255,
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'Please provide email.'],
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  password: {
    required: [true, 'Enter your password'],
    type: String,
    minlength: 8,
    select: false,
  },
});

// Pre-save middleware to hash the password if it's modified or new
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  // Generate salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);

const UserLeagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware to capitalize first letter of each word in 'name' field
UserLeagueSchema.pre('save', function (next) {
  this.name = this.name.replace(/\b\w/g, (char) => char.toUpperCase());
  next();
});

const UserLeague = mongoose.model('UserLeague', UserLeagueSchema);

module.exports = { User, UserLeague };
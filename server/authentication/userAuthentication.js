const { User } = require('../model/userModel');
const bcrypt = require('bcrypt');
const debugLib = require('debug');
const {
  registerValidation,
  loginValidation,
} = require('../validation/userValidation');
const { errorResponseFactory } = require('../utils/errorResponseFactory');
const { responseFactory } = require('../utils/responseFactory');
const { signToken } = require('../utils/signToken');

const debug = debugLib('server:user-controller');

// Register a user
const registerUser = async (req, res) => {
  // Validate the data before user registration
  const { error } = registerValidation(req.body);
  if (error) {
    return errorResponseFactory(res, 400, error.details[0].message, {
      details: error.details,
    });
  }

  // Checking if email is unique
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    return errorResponseFactory(res, 400, 'Email already exists');
  }

  // Checking if username is unique
  const userName = await User.findOne({ username: req.body.username }).exec();
  if (userName) {
    return errorResponseFactory(res, 400, 'Username already exists');
  }

  // Create a new user
  const userDetails = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });

  try {
    await userDetails.save();

    return responseFactory(res, 201, { message: 'Successfully registered' });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

// Login a user
const loginUser = async (req, res) => {
  // Validate the data before login
  const { error } = loginValidation(req.body);
  if (error) {
    return errorResponseFactory(res, 400, error.details[0].message, {
      details: error.details,
    });
  }

  // Checking if email exists
  const searchUser = await User.findOne({ email: req.body.email })
    .select(['email', 'password', 'username', 'role'])
    .exec();

  debug('User email', searchUser);

  if (!searchUser) {
    return errorResponseFactory(res, 400, 'Email or password is wrong');
  }

  // Check if password is correct
  const validPassword = bcrypt.compareSync(
    req.body.password,
    searchUser.password
  );

  if (!validPassword) {
    return errorResponseFactory(res, 400, 'Email or password is wrong');
  }

  try {
    // Create and assign a token
    const { _id, username, email, role } = searchUser;
    const token = signToken(_id, username, email, role);

    return responseFactory(res, 200, { token });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

module.exports = { registerUser, loginUser };

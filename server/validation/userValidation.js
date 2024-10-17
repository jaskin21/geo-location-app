const Joi = require('joi');

// Register input validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().max(255),
    email: Joi.string().required().max(255).lowercase().email(),
    role: Joi.string().lowercase().valid('admin', 'user'),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

// Login input validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().lowercase().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

// Create user validation
const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  console.log('userValidation input validated');
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, userValidation };
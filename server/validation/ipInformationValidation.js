const Joi = require('joi');

// Register input validation
const ipInformationValidation = (data) => {
  const schema = Joi.object({
    ip: Joi.string().required(),
    city: Joi.string(),
    region: Joi.string(),
    country: Joi.string(),
    postal: Joi.string(),
    timezone: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = { ipInformationValidation };

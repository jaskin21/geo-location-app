const Joi = require('joi');

// Register input validation
const bookmarkNote = (data) => {
  const schema = Joi.object({
    ip: Joi.string().required(),
    note: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = { bookmarkNote };

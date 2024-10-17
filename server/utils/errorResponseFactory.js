const { responseFactory } = require('./responseFactory.js');

const errorResponseFactory = (
  response,
  statusCode,
  errorMessage,
  otherDetails = undefined
) => {
  return responseFactory(response, statusCode, {
    error: errorMessage,
    ...(otherDetails && { ...otherDetails }), // Use spread syntax only if otherDetails is provided
  });
};

module.exports = { errorResponseFactory };
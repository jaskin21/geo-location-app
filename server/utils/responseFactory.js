/**
 * Response status codes
 */
const responseStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Resolves a status code to a human-readable status message
 *
 * @param {number} statusCode - The HTTP status code to resolve
 * @returns {string} A human-readable message for the given status code
 */
const statusMessageResolver = (statusCode) => {
  switch (statusCode) {
    case responseStatus.OK:
      return 'Success';
    case responseStatus.CREATED:
      return 'New resource was created';
    case responseStatus.BAD_REQUEST:
      return 'Cannot process the request';
    case responseStatus.UNAUTHORIZED:
      return 'You must authenticate';
    case responseStatus.FORBIDDEN:
      return 'Does not have access rights';
    case responseStatus.NOT_FOUND:
      return 'Cannot find the requested resource';
    case responseStatus.INTERNAL_SERVER_ERROR:
      return 'Something went wrong, please try again';
    default:
      return 'Unknown status code';
  }
};

/**
 * Response factory for consistency of error format
 *
 * @param {Response} response - The Express response object
 * @param {number} statusCode - HTTP status code for the response
 * @param {object} [details={}] - Optional details about the response (e.g., data, errors)
 * @returns {Response} - The structured JSON response
 */
const responseFactory = (response, statusCode, details = {}) => {
  return response.status(statusCode).json({
    status: statusMessageResolver(statusCode),
    ...details,
  });
};

// Exporting the functions and objects using module.exports (CommonJS style)
module.exports = {
  responseStatus,
  responseFactory,
};
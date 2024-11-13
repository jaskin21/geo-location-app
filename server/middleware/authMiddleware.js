const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel.js');
const { errorResponseFactory } = require('../utils/errorResponseFactory.js');
const { responseStatus } = require('../utils/responseFactory.js');
const { Roles } = require('../constant/middleware.js');

const roleMiddleware = (requiredRoles = [Roles.USER]) => {
  return async (req, res, next) => {
    const token =
      req.token || // Check BearerTokenMiddleware what is this
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'];

    if (!token) {
      return errorResponseFactory(
        res,
        responseStatus.FORBIDDEN,
        'A token is required for authentication'
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded.sub) {
        const user = await User.findById(decoded.sub).exec();

        if (!user) {
          return errorResponseFactory(
            res,
            responseStatus.UNAUTHORIZED,
            'User not found'
          );
        }

        // Step 4: Check if the user's role matches one of the required roles
        if (!requiredRoles.includes(decoded.role)) {
          return errorResponseFactory(
            res,
            responseStatus.FORBIDDEN,
            'You do not have permission to access this resource'
          );
        }

        // Attach user data to the request for further use
        req.user = decoded;
      } else {
        return errorResponseFactory(
          res,
          responseStatus.UNAUTHORIZED,
          'Invalid token structure'
        );
      }
    } catch (err) {
      console.log(err);
      return errorResponseFactory(
        res,
        responseStatus.UNAUTHORIZED,
        'Invalid Token',
        {
          details: err?.message,
        }
      );
    }

    next();
  };
};

module.exports = roleMiddleware;

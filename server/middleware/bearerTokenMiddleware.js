const bearerTokenMiddleware = (req, res, next) => {
  const authorization = req.headers?.authorization;

  if (authorization !== undefined) {
    const [, token] = authorization.split(' ');
    req.token = token;
  }

  next();
};

module.exports = bearerTokenMiddleware;

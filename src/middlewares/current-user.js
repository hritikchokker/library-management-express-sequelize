const { decode } = require("../utils/tokenmanager");
const { BadRequestError } = require("../errors/bad-request-error");
exports.currentUser = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(
        new BadRequestError({
          statusCode: 401,
          message: "invalid request token is missing",
        })
      );
    }
    const user = decode(req.headers.authorization);
    req.currentUser = user;
    next();
  } catch (err) {
    return next(
      new BadRequestError({
        statusCode: 400,
        message: "invalid token",
      })
    );
  }
};

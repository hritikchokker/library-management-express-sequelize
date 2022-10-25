const { decode, checkForExpiry } = require("../utils/tokenmanager");
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
    if (user.exp && checkForExpiry(user.exp)) {
      return next(
        new BadRequestError({
          statusCode: 401,
          message: "token expired please login again",
        })
      );
    }
    req.currentUser = {
      userId: user.userId,
      sessionId: user.sessionId,
    };
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

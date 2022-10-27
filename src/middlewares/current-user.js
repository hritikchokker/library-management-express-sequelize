const { decode, checkForExpiry } = require("../utils/tokenmanager");
const { BadRequestError } = require("../errors/bad-request-error");
const { db } = require("../models");
const SessionModel = db.session;
exports.currentUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(
        new BadRequestError({
          statusCode: 401,
          message: "invalid request token is missing",
        })
      );
    }
    if (req.headers.authorization.includes("Bearer")) {
      req.headers.authorization = req.headers.authorization.split(" ")[1];
    }
    const user = decode(req.headers.authorization);
    const sessionDetails = await SessionModel.findOne({
      where: { id: user.sessionId },
    });
    if (!sessionDetails) {
      return next(
        new BadRequestError({
          message: "token expired, user is logged out, please login again",
          statusCode: 401,
        })
      );
    }
    if (user.exp && checkForExpiry(sessionDetails.expiresIn)) {
      await sessionDetails.destroy();
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

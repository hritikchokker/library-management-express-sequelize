const { NotFoundError } = require("../errors/not-found-error");
exports.requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    next(
      new NotFoundError({
        message: "token expired please login again",
        statusCode: 401,
      })
    );
  }
  next();
};

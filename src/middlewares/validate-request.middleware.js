const { validationResult } = require("express-validator");
const {
  RequestValidationError,
} = require("../errors/request-validation-errors");
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new RequestValidationError({
        statusCode: 400,
        message: "validation error",
        errors: errors.array(),
      })
    );
  }
  next();
  return;
};

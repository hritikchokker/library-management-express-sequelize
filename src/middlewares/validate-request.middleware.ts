const { validationResult } = require("express-validator");
import { RequestValidationError } from "../errors/request-validation-errors";
export const validateRequest = (req, res, next) => {
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

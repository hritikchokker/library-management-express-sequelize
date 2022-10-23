const { validationResult } =require("express-validator");
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "validation error",
      errors: errors.array(),
    });
  }
  next();
  return;
};

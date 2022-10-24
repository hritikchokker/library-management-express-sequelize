class BadRequestError extends Error {
  statusCode = 400;
  constructor(errorObj) {
    super(errorObj);
    this.message = errorObj.message;
    this.statusCode = errorObj.statusCode;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}

exports.BadRequestError = BadRequestError;

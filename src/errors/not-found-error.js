class NotFoundError extends Error {
  statusCode = 400;
  constructor(errorObj) {
    super(errorObj);
    this.message = errorObj.message;
    this.statusCode = errorObj.statusCode;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}

exports.NotFoundError = NotFoundError;

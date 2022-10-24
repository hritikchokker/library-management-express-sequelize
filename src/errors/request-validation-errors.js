class RequestValidationError extends Error {
  statusCode = 400;
  constructor(errorObj) {
    super(errorObj);
    this.message = errorObj.message;
    this.statusCode = errorObj.statusCode;
    this.errors = errorObj.errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.message,
        statusCode: this.statusCode,
        errors: this.errors,
      },
    ];
  }
}

exports.RequestValidationError = RequestValidationError;

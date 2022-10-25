export class RequestValidationError extends Error {
  statusCode = 400;
  errors: any;
  constructor(errorObj: any) {
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

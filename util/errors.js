class NotAuthError {
  constructor(message) {
    this.message = message;
    this.status = 401;
  }
}
exports.NotAuthError = NotAuthError;

function error(message) {
  if (message instanceof Error) {
    message = message.message;
  }
  this.locals._errors.push(message);
  return this;
}

module.exports = error;

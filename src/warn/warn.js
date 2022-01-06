function warn(message) {
  if (message instanceof Error) {
    message = message.message;
  }
  this.locals._warnings.push(message);
  return this;
}

module.exports = warn;

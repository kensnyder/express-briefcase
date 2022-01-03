function devError(message) {
  if (process.env.NODE_ENV !== 'development') {
    return this;
  }
  return this.error(message);
}

module.exports = devError;

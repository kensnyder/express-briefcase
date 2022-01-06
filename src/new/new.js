function newRecord({ id, url = undefined }) {
  this.locals._new = { id, url };
  this.status(201);
  return this;
}

module.exports = newRecord;

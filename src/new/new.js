function newRecord({ id, url = undefined }) {
  if (url && !/^https?:/i.test(url)) {
    url = `${this.req.protocol}://${this.req.hostname}${url}`;
  }
  this._new = { id, url };
  this.status(201);
  return this;
}

module.exports = newRecord;

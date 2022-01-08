/**
 * Return information about a newly created record and set status to 201.
 * @param {String|Number} id  The id of the new record
 * @param {String} [url]  The API URL to fetch that new resource
 * @returns {Response}
 * @chainable
 */
function newRecord({ id, url = undefined }) {
  this.locals._new = { id, url };
  this.status(201);
  return this;
}

module.exports = newRecord;

/**
 * Calculate pagination metadata based on current request
 * For GET/HEAD it also calls res.links({ prev, next }) to add a Link http header
 * @param {Number} total  The total number of records if a limit were not applied
 * @param {Number} perPage  The number of items per page (falls back to req.query.limit then req.body.limit then 10)
 * @param {Number} page  The current page number (falls back to req.query.page then req.body.page then 1)
 * @returns {Response}
 * @chainable
 */
function total({ total, perPage = undefined, page = undefined }) {
  if (perPage === undefined) {
    perPage = _guessLimit(this.req);
  }
  if (page === undefined) {
    page = _guessPage(this.req);
  }
  const numPages = Math.ceil(total / perPage);
  const hasNextPage = page < numPages;
  // for endpoints with pagination
  this.locals._pagination = {
    perPage, // number of records per page
    page, // the current page
    total, // total number of records
    numPages, // total number of pages
    hasNextPage, // true if there are more pages
  };
  if (/^GET|HEAD$/i.test(this.req.method)) {
    const prev = page === 1 ? null : _buildPageLink(this.req, page - 1);
    const next = hasNextPage ? _buildPageLink(this.req, page + 1) : null;
    this.locals._pagination.prev = prev;
    this.locals._pagination.next = next;
    this.links({ prev, next });
  }
  return this;
}

function _guessLimit(req) {
  const limit = req.payload?.limit || req.query.limit || req.body.limit;
  return parseInt(limit) || 10;
}

function _guessPage(req) {
  const page = req.payload?.page || req.query.page || req.body.page;
  return parseInt(page) || 1;
}

function _buildPageLink(req, forPage) {
  let queryString = '';
  const params = new URLSearchParams(req.query);
  params.set('page', forPage);
  params.sort();
  queryString = '?' + params.toString();
  return req.path + queryString;
}

// make our helper function unit testable
total._buildPageLink = _buildPageLink;

module.exports = total;

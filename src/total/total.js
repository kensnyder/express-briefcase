function total({ total, perPage = undefined, page = undefined }) {
  if (perPage === undefined) {
    perPage = parseInt(this.req.query.limit || this.req.body.limit) || 25;
  }
  if (page === undefined) {
    page = parseInt(this.req.query.page || this.req.body.page) || 1;
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

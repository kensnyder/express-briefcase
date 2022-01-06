function total({ total, perPage = undefined, page = undefined }) {
  if (perPage === undefined) {
    perPage = parseInt(this.req.query.limit || this.req.body.limit) || 25;
  }
  if (page === undefined) {
    page = parseInt(this.req.query.page || this.req.page.limit) || 1;
  }
  const numPages = Math.ceil(total / perPage);
  const hasNextPage = page < numPages;
  const prev = page === 1 ? null : _buildPageLink(this.req, page - 1);
  const next = hasNextPage ? _buildPageLink(this.req, page + 1) : null;
  // for endpoints with pagination
  this.locals._pagination = {
    perPage, // number of records per page
    page, // the current page
    total, // total number of records
    numPages, // total number of pages
    hasNextPage, // true if there are more pages
    prev, // url for previous page of records (or null)
    next, // url for next page of records (or null)
  };
  this.links({ next, prev });
  return this;
}

function _buildPageLink(req, forPage) {
  let queryString = '';
  if (/^GET|HEAD$/i.test(req.method)) {
    const params = new URLSearchParams(req.query);
    params.set('page', forPage);
    params.sort();
    queryString = '?' + params.toString();
  }
  return req.path + queryString;
}

// make our helper function unit testable
total._buildPageLink = _buildPageLink;

module.exports = total;

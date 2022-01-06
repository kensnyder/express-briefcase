const total = require('./total.js');

describe('res.total()', () => {
  let links, res;
  beforeEach(() => {
    links = jest.fn();
    res = {
      req: {
        method: 'GET',
        path: '/search',
      },
      locals: {},
      total,
      links,
    };
  });
  it('should properly calculate values', () => {
    res.query = {
      limit: 10,
      page: 2,
    };
    res.total({ total: 32, perPage: 25, page: 2 });
    expect(res.locals._pagination).toEqual({
      perPage: 25,
      page: 2,
      total: 32,
      numPages: 2,
      hasNextPage: false,
      prev: '/search?page=1',
      next: null,
    });
    expect(links).toHaveBeenCalledWith({
      prev: '/search?page=1',
      next: null,
    });
  });
  it('should default to limit and page specified in req.query', () => {
    res.req.query = {
      limit: 10,
      page: 2,
    };
    res.total({ total: 101 });
    expect(res.locals._pagination).toEqual({
      perPage: 10,
      page: 2,
      total: 101,
      numPages: 11,
      hasNextPage: true,
      prev: '/search?limit=10&page=1',
      next: '/search?limit=10&page=3',
    });
    expect(links).toHaveBeenCalledWith({
      prev: '/search?limit=10&page=1',
      next: '/search?limit=10&page=3',
    });
  });
  it('should default to limit and page specified in req.body', () => {
    res.req.method = 'POST';
    res.req.query = {};
    res.req.body = {
      limit: 10,
      page: 2,
    };
    res.total({ total: 100 });
    expect(res.locals._pagination).toEqual({
      perPage: 10,
      page: 2,
      total: 100,
      numPages: 10,
      hasNextPage: true,
    });
    expect(links).not.toHaveBeenCalled();
  });
  it('should fallback to limit 10 and page 1', () => {
    res.req.query = {};
    res.req.body = {};
    res.total({ total: 99 });
    expect(res.locals._pagination).toEqual({
      perPage: 10,
      page: 1,
      total: 99,
      numPages: 10,
      hasNextPage: true,
      prev: null,
      next: '/search?page=2',
    });
    expect(links).toHaveBeenCalledWith({
      prev: null,
      next: '/search?page=2',
    });
  });
});

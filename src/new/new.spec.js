const newRecord = require('./new.js');

fdescribe('res.new()', () => {
  let res, status;
  beforeEach(() => {
    status = jest.fn();
    res = {
      locals: {},
      new: newRecord,
      status,
    };
  });
  it('should properly store id and url', () => {
    res.new({ id: 123, url: '/api/v1/user/123' });
    expect(res.locals._new).toEqual({ id: 123, url: '/api/v1/user/123' });
    expect(status).toHaveBeenCalledWith(201);
  });
  it('should leave off url if ommitted', () => {
    res.new({ id: 123 });
    expect(res.locals._new).toEqual({ id: 123 });
    expect(status).toHaveBeenCalledWith(201);
  });
});

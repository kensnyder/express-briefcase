const devError = require('./devError.js');
const error = require('../error/error.js');

fdescribe('res.devError()', () => {
  let res;
  beforeEach(() => {
    res = {
      locals: {
        _errors: [],
      },
      devError,
      error,
    };
  });
  it('should add errors in dev', () => {
    process.env.NODE_ENV = 'development';
    res.devError('Error Message');
    expect(res.locals._errors).toEqual(['Error Message']);
  });
  it('should not add errors in prod', () => {
    process.env.NODE_ENV = 'prod';
    res.devError(new Error('Error Message'));
    expect(res.locals._errors).toEqual([]);
  });
});

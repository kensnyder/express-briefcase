const error = require('./error.js');

fdescribe('res.error()', () => {
  let res;
  beforeEach(() => {
    res = {
      locals: {
        _errors: [],
      },
      error,
    };
  });
  it('should properly handle strings', () => {
    res.error('Error Message');
    expect(res.locals._errors).toEqual(['Error Message']);
  });
  it('should properly handle Error objects', () => {
    res.error(new Error('Error Message'));
    expect(res.locals._errors).toEqual(['Error Message']);
  });
  it('should properly handle Error subclassed objects', () => {
    res.error(new TypeError('Error Message'));
    expect(res.locals._errors).toEqual(['Error Message']);
  });
});

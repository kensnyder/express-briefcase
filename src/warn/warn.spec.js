const warn = require('./warn.js');

describe('res.warn()', () => {
  let res;
  beforeEach(() => {
    res = {
      locals: {
        _warnings: [],
      },
      warn,
    };
  });
  it('should properly handle strings', () => {
    res.warn('Warning Message');
    expect(res.locals._warnings).toEqual(['Warning Message']);
  });
  it('should properly handle Error objects', () => {
    res.warn(new Error('Warning Message'));
    expect(res.locals._warnings).toEqual(['Warning Message']);
  });
  it('should properly handle Error subclassed objects', () => {
    res.warn(new TypeError('Warning Message'));
    expect(res.locals._warnings).toEqual(['Warning Message']);
  });
});

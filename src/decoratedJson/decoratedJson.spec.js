const { decoratedJson, decoratedHeaders } = require('./decoratedJson.js');

describe('res.decoratedJson()', () => {
  let res, json;
  beforeEach(() => {
    json = jest.fn();
    res = {
      statusCode: 200,
      locals: {
        _startedAt: new Date() - 400,
        _errors: [],
        _warnings: ['Be nice'],
        _new: { id: 1 },
        _pagination: {},
      },
      decoratedJson,
      json,
    };
  });
  it('should properly handle basic data', () => {
    res.decoratedJson({ foo: 'bar' });
    expect(json.mock.calls[0][0].took).toBeCloseTo(400, -2);
    expect(json.mock.calls[0][0].status).toBe(200);
    expect(json.mock.calls[0][0].statusClass).toBe('2xx');
    expect(json.mock.calls[0][0].success).toBe(true);
    expect(json.mock.calls[0][0].errors).toEqual([]);
    expect(json.mock.calls[0][0].warnings).toEqual(['Be nice']);
    expect(json.mock.calls[0][0].new).toEqual({ id: 1 });
    expect(json.mock.calls[0][0].pagination).toEqual({});
    expect(json.mock.calls[0][0].payload).toEqual({ foo: 'bar' });
  });
  it('should properly handle error status', () => {
    res.statusCode = 403;
    res.decoratedJson({ foo: 'bar' });
    expect(json.mock.calls[0][0].status).toBe(403);
    expect(json.mock.calls[0][0].statusClass).toBe('4xx');
    expect(json.mock.calls[0][0].success).toBe(false);
  });
  it('should properly default payload to null', () => {
    res.decoratedJson();
    expect(json.mock.calls[0][0].payload).toBe(null);
  });
  it('should properly handle when _startedAt is falsy', () => {
    res.locals._startedAt = undefined;
    res.decoratedJson({ foo: 'bar' });
    expect(json.mock.calls[0][0].took).toBe(undefined);
  });
  it('should handle a customizer that changes by reference', () => {
    res.locals._customizer = function (shell) {
      shell.request_ref = 'ABC';
      shell.date = undefined;
      return shell;
    };
    res.decoratedJson({ data: 123 });
    expect(json.mock.calls[0][0].request_ref).toBe('ABC');
    expect(json.mock.calls[0][0].payload).toEqual({ data: 123 });
    expect(json.mock.calls[0][0].date).toBe(undefined);
  });
  it('should handle a customizer that changes by value', () => {
    res.locals._customizer = function () {
      return { custom: 'yep' };
    };
    res.decoratedJson({ ignore: 'me' });
    expect(json.mock.calls[0][0]).toEqual({ custom: 'yep' });
  });
});

describe('res.decoratedHeaders()', () => {
  let res, headers;
  beforeEach(() => {
    headers = {};
    res = {
      statusCode: 200,
      locals: {
        _startedAt: new Date() - 400,
        _errors: [],
        _warnings: ['Be nice'],
        _new: { id: 1 },
        _pagination: {},
      },
      decoratedHeaders,
      header(name, value) {
        headers[name] = value;
        return res;
      },
    };
  });
  it('should properly setHeaders', () => {
    expect(headers).toEqual({
      'API-Started-At': String(res.locals._startedAt),
      'API-Errors': '',
      'API-Warnings': 'Be nice',
      'API-New-Id': '1',
    });
  });
});

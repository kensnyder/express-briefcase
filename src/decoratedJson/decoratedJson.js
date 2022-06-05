/**
 * Send the given payload, wrapped with metadata including date, errors, warnings, and pagination
 * @param {*} [data=null]  The payload to send
 * @returns {Response}
 * @chainable
 */
function decoratedJson(data = null) {
  const shell = _buildShell.call(this, data);
  this.json(shell);
  return this;
}

/**
 * Build a shell of a response
 * @param {Object|null} data
 * @return {Object}
 * @private
 */
function _buildShell(data) {
  const status = this.statusCode;
  const took = this.locals._startedAt ? new Date() - this.locals._startedAt : 0;
  let shell = {
    date: this.locals._startedAt || new Date(),
    // in CloudFlare workers, "took" will always be 0, so omit in that case
    took: took > 0 ? took : undefined,
    status,
    statusClass: String(status).slice(0, 1) + 'xx',
    success: status < 400,
    errors: this.locals._errors,
    warnings: this.locals._warnings,
    new: this.locals._new,
    pagination: this.locals._pagination,
    payload: data,
  };
  if (this.locals._customizer) {
    shell = this.locals._customizer.call(this, shell, this.req, this);
  }
  return shell;
}

/**
 * Send headers instead of decorating JSON
 * @param prefix
 * @return {decoratedHeaders}
 */
function headerizedJson(data = null, prefix = 'API') {
  const shell = _buildShell.call(this, data);
  for (const [key, value] of _headerize(shell)) {
    this.header(prefix + _upperKebabCase(key), _serializeToHeader(value));
  }
  this.json(shell.payload);
  return this;
}

/**
 * Convert strings to Upper-Kebab-Case
 * @param {String} camelCase  String in camelCase
 * @return {String}
 * @private
 */
function _upperKebabCase(camelCase) {
  return camelCase.replace(/(^|[A-Z])/g, ($0, $1) => {
    return '-' + $1.toUpperCase();
  });
}

function _serializeToHeader(value) {
  return String(Array.isArray(value) ? value.join('; ') : value);
}

function _flatten(key, value, path) {
  if (!value) {
    return [key, ''];
  } else if (Array.isArray(value)) {
    //
  } else if (typeof value === 'object') {
    //
  } else {
    // string, number
    return [key, String(value)];
  }
}

module.exports = { decoratedJson, headerizedJson };

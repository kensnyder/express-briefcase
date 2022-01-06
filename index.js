// Besides exporting the middleware function below,
// we also need to extend res.prototype with our new methods:
// decoratedJson(), devError(), error(), new(), total(), warn()
const extendResPrototype = require('./src/extendResPrototype.js');
extendResPrototype();

/**
 * Return our middleware to add some local variables for use with our new methods
 * @param {Function} [customizer]  Allows altering the final metadata and payload
 */
function briefcase(customizer = null) {
  /**
   * A middleware to add some local variables for use with our new methods
   * @param {Request} req  The Express request object
   * @param {Response} res  The Express Response object
   * @param {Function} next  Call to continue with next middleware
   */
  return function (req, res, next) {
    // note the time we started
    res.locals._startedAt = new Date();
    // setup empty fields
    res.locals._errors = [];
    res.locals._warnings = [];
    res.locals._new = null;
    res.locals._pagination = null;
    // note the function (if any) for customizing briefcase
    res.locals._customizer = customizer;
    // proceed to next middleware
    next();
  };
}

module.exports = briefcase;

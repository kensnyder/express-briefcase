// besides the middleware, we also need to extend res.prototype
require('./src/extendResPrototype.js');

/**
 * A middleware to extend the Express "res" object
 * @param {Request} req  The Express request object
 * @param {Response} res  The Express Response object
 * @param {Function} next  Call to continue with next middleware
 */
function briefcase(customizer = null) {
  return function (req, res, next) {
    // note the time we started
    res.startedAt = new Date();
    // setup empty fields
    res._errors = [];
    res._warnings = [];
    res._new = null;
    res._pagination = null;
    // note the function (if any) for customizing briefcase
    res._customizer = customizer;
    // proceed to next middleware
    next();
  };
}

module.exports = briefcase;

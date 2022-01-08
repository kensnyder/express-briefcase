declare module "src/decoratedJson/decoratedJson" {
    export = decoratedJson;
    /**
     * Send the given payload, wrapped with metadata including date, errors, warnings, and pagination
     * @param {*} [data=null]  The payload to send
     * @returns {Response}
     * @chainable
     */
    function decoratedJson(data?: any): Response;
}
declare module "src/error/error" {
    export = error;
    /**
     * Add error message
     * @param {String|Error} message  The error string (or the Error whose message property to use)
     * @returns {Response}
     * @chainable
     */
    function error(message: string | Error): Response;
}
declare module "src/devError/devError" {
    export = devError;
    /**
     * Add error message only if NODE_ENV is "development"
     * @param {String|Error} message
     * @returns {Response}
     * @chainable
     */
    function devError(message: string | Error): Response;
}
declare module "src/warn/warn" {
    export = warn;
    /**
     * Add warning message
     * @param {String|Error} message  The warning string (or the Error whose message property to use)
     * @returns {Response}
     * @chainable
     */
    function warn(message: string | Error): Response;
}
declare module "src/new/new" {
    export = newRecord;
    /**
     * Return information about a newly created record and set status to 201.
     * @param {String|Number} id  The id of the new record
     * @param {String} [url]  The API URL to fetch that new resource
     * @returns {Response}
     * @chainable
     */
    function newRecord({ id, url }: string | number): Response;
}
declare module "src/total/total" {
    export = total;
    /**
     * Calculate pagination metadata based on current request
     * For GET/HEAD it also calls res.links({ prev, next }) to add a Link http header
     * @param {Number} total  The total number of records if a limit were not applied
     * @param {Number} perPage  The number of items per page (falls back to req.query.limit then req.body.limit then 10)
     * @param {Number} page  The current page number (falls back to req.query.page then req.body.page then 1)
     * @returns {Response}
     * @chainable
     */
    function total({ total, perPage, page }: number): Response;
    namespace total {
        export { _buildPageLink };
    }
    function _buildPageLink(req: any, forPage: any): string;
}
declare module "src/extendResPrototype" {
    export = extendResPrototype;
    function extendResPrototype(): void;
}
declare module "index" {
    export = briefcase;
    /**
     * Return our middleware to add some local variables for use with our new methods
     * @param {Function} [customizer]  Allows altering the final metadata and payload
     */
    function briefcase(customizer?: Function): (req: Request, res: Response, next: Function) => void;
}

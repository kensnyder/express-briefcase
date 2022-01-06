# 💼 express-briefcase

[![Build Status](https://travis-ci.com/kensnyder/express-briefcase.svg?branch=master&v=1.0.0)](https://travis-ci.com/kensnyder/express-briefcase)
[![Code Coverage](https://codecov.io/gh/kensnyder/express-briefcase/branch/master/graph/badge.svg?v=1.0.0)](https://codecov.io/gh/kensnyder/express-briefcase)
[![ISC License](https://img.shields.io/npm/l/express-briefcase.svg?v=1.0.0)](https://opensource.org/licenses/ISC)

Include metadata in response json such as errors, warnings and pagination

## Installation

`npm install express-briefcase`

## Using the middleware

Using default behavior:

```js
const express = require('express');
const app = express();
app.use(briefcase());
```

Adding custom metadata:

```js
const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(briefcase(shell => {
    shell.requestReferenceId = uuid.v4();
    if (shell.statusClass === '5xx') {
        shell.apology = 'Sorry about that!';
    }    
    return shell;
}));
```

Accessing the res object:

```js
const express = require('express');
const uuid = require('uuid');
const app = express();
app.use(briefcase(function(shell) {
    // inside your customizer function, "this" is express's "res" object
    shell.statusMessage = this.statusMessage;
    return shell;
}));
```

### Using the new res methods

1. [res.decoratedJson()](using-res-decoratedjson)
1. [res.error()](using-res-error)
1. [res.devError()](using-res-deverror)
1. [res.warn()](using-res-warn)
1. [res.new()](using-res-new)
1. [res.total()](using-res-total)

#### Using `res.decoratedJson()`

```js
app.get('/user/:id', async (req, res) => {
    const user = await getUser(req.params.id);
    res.decoratedJson(user);
});
```

Resulting response JSON

```json
{
  "date": "2022-01-03T04:48:00.095Z",
  "took": 451,
  "status": 200,
  "statusClass": "2xx",
  "success": true,
  "errors": [],
  "warnings": [],
  "new": null,
  "pagination": null,
  "payload": {
    "id": 123,
    "fname": "Joe",
    "lname": "User"
  }
}
```

------------------------

#### Using `res.error()`

```js
app.get('/user/:id', async (req, res) => {
    const user = await getUser(req.params.id);
    if (user === null) {
       // Note: error can be a string or instance of Error
       res.error('User not found');
       res.status(404);
    }
    res.decoratedJson(user);
});
```

Resulting response JSON

```json
{
  "date": "2022-01-03T04:48:00.095Z",
  "took": 452,
  "status": 404,
  "statusClass": "4xx",
  "success": false,
  "errors": ["User not found"],
  "warnings": [],
  "new": null,
  "pagination": null,
  "payload": null
}
```

---------------------------

#### Using `res.devError()`

Same as [res.error()](using-res-error) except that the error string will
only be added if `process.env.NODE_ENV === 'development'`.

-----------------------

#### Using `res.warn()`

```js
app.get('/user/:id', async (req, res) => {
    if (req.query.role) {
       res.warn('Passing role to /user/:id is deprecated.');
    }
    const user = await getUser(req.params.id);
    res.decoratedJson(user);
});
```

Resulting response JSON

```json
{
  "date": "2022-01-03T04:48:00.095Z",
  "took": 458,
  "status": 200,
  "statusClass": "4xx",
  "success": true,
  "errors": [],
  "warnings": ["Passing role to /user/:id is deprecated."],
  "new": null,
  "pagination": null,
  "payload": {
    "id": 123,
    "fname": "Joe",
    "lname": "User"
  }
}
```

----------------------

#### Using `res.new()`

```js
app.post('/user', async (req, res) => {
    const { newId } = await createUser(req.body);
    res.new({ id: newId, url: `/users/${newId}` });
    res.decoratedJson();
});
```

Resulting response JSON

```json
{
  "date": "2022-01-03T04:48:00.095Z",
  "took": 458,
  "status": 201,
  "statusClass": "2xx",
  "success": true,
  "errors": [],
  "warnings": [],
  "new": {
    "id": 123,
    "url": "/users/123"
  },
  "pagination": null,
  "payload": null
}
```

------------------------

#### Using `res.total()`

```js
app.get('/users/search', async (req, res) => {
   const { list, total } = await getUsers({ 
       name: req.query.name,
       page: req.query.page,
       limit: 25,
   });
   res.total({ total, page: req.query.page, perPage: 25 });
   res.decoratedJson(user);
});
```

Resulting response JSON

```json
{
  "date": "2022-01-03T04:48:00.095Z",
  "took": 454,
  "status": 200,
  "statusClass": "2xx",
  "success": true,
  "errors": [],
  "warnings": [],
  "new": null,
  "pagination": {
    "perPage": 25,
    "page": 2,
    "total": 104,
    "numPages": 5,
    "hasNextPage": true,
    "prev": "/users/search?name=John&page=1",
    "next": "/users/search?name=John&page=3"
  },
  "payload": [
    {
      "id": 576,
      "fname": "Jennifer",
      "lname": "Johnson"
    },
    "..."
  ]
}
```

### Unit Tests and Code Coverage

Powered by jest

```bash
npm test
npm run coverage
```

## Contributing

Contributions are welcome. Please open a GitHub ticket for bugs or feature
requests. Please make a pull request for any fixes or new code you'd like to be
incorporated.

## License

Open Source under the [ISC License](https://opensource.org/licenses/ISC).


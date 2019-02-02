# react-use-promise

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-promise.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-promise)
[![Coverage Status](https://coveralls.io/repos/github/bsonntag/react-use-promise/badge.svg?branch=master)](https://coveralls.io/github/bsonntag/react-use-promise?branch=master)

React hook for handling promises.

## Disclaimer

This is using the upcoming [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
which is **subject to change** until released to a final version.

This means that the API of this module is also subject to change.
Please **don't** use it on a production application.

## Disclaimer #2

While this works and is an interesting use of hooks,
it might be a better idea to use Suspense when dealing with promises.

Suspense isn't still fully released, but you can start using it with
[`React.lazy`](https://reactjs.org/docs/code-splitting.html#suspense).

## Installation

Using npm:

```sh
$ npm install --save react-use-promise
```

Using yarn:

```sh
$ yarn add react-use-promise
```

Since this module uses React's upcoming Hooks feature,
to try this out you'll need to install the `16.8.0-alpha.1` version
of `react` and `react-dom`:

```sh
$ yarn add react@16.8.0-alpha.1 react-dom@16.8.0-alpha.1
```

## Usage

```js
import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';

function Example() {
  const [result, error, state] = usePromise(useMemo(
    () => new Promise(resolve => {
      setTimeout(() => resolve('foo'), 2000);
    }),
    []
  ));

  return (
    <div>
      <p>{state}</p>
      <p>{result || error}</p>
    </div>
  );
}
```

## API

```js
usePromise<Result, Error>(Promise<Result, Error> | () => Promise<Result, Error>): [
  Result,
  Error,
  'pending' | 'resolved' | 'rejected'
]
```

Receives a promise or a function that returns a promise and returns an array
with the promise's result, error and state. The state is a string that can
have one of three values: `'pending'`, `'resolved'` or `'rejected'`.

**Note:** You'll probably want to avoid passing new promises on each render.
This can happen if you do something like this:

```js
const [response, error] = usePromise(fetch(url));
```

This will call `fetch` on every render, which will return a new promise each time.
In this case, wrap the promise in `useMemo` or `useCallback`, so that you only pass
a new promise when something changes. Example:

```js
const [response, error] = usePromise(useMemo(
  () => fetch(url),
  [url]
));
```

This will only call `fetch` when the `url` changes.

## Development

Clone the repo and install the dependencies by running `yarn` on the project's
root directory (or `npm install`, if you don't have yarn installed).

Tests can be run with `yarn test` (or `npm test`) and there's an example
application that can be run with `yarn example` (or `npm run example`).

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT

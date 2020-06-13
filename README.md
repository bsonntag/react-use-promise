# react-use-promise

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-promise.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-promise)

React hook for handling promises.

## Disclaimer

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

Since this module uses React's new [Hooks feature](https://reactjs.org/docs/hooks-intro.html),
to try this out you'll need to install at least version `16.8.0`
of `react` and `react-dom`:

```sh
$ yarn add react@^16.8.0 react-dom@^16.8.0
```

## Usage

```js
import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';

function Example() {
  const [result, error, state] = usePromise(
    () => new Promise(resolve => {
      setTimeout(() => resolve('foo'), 2000);
    }),
    []
  );

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
usePromise<Result, Error>(
  Promise<Result, Error> | () => Promise<Result, Error>,
  Array<any>
): [
  Result,
  Error,
  'pending' | 'resolved' | 'rejected'
]
```

Receives a promise or a function that returns a promise and returns an array
with the promise's result, error and state. The state is a string that can
have one of three values: `'pending'`, `'resolved'` or `'rejected'`.

**Note:** You'll need to pass the inputs array to `usePromise`, otherwise
this will try to resolve the promise on every render. For example:

```js
const [response, error] = usePromise(
  () => fetch(url),
  [url]
);
```

This will only call `fetch` again when the `url` changes.

If you only want to resolve the promise once, pass an empty array, like this:

```js
const [result, error] = usePromise(
  () => Notification.requestPermission(),
  []
);
```

## Development

Clone the repo and install the dependencies by running `yarn` on the project's
root directory (or `npm install`, if you don't have yarn installed).

Tests can be run with `yarn test` (or `npm test`) and there's an example
application that can be run with `yarn example` (or `npm run example`).

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT

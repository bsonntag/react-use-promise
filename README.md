# react-use-promise

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-promise.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-promise)
[![Coverage Status](https://coveralls.io/repos/github/bsonntag/react-use-promise/badge.svg?branch=master)](https://coveralls.io/github/bsonntag/react-use-promise?branch=master)

React hook for handling promises.

## Installation

Using npm:

```sh
$ npm install --save react-use-promise
```

Using yarn:

```sh
$ yarn add react-use-promise
```

This module uses React's upcoming hooks feature.
To try this out you'll also need to install the 16.7.0-alpha.0 version
of `react` and `react-dom`:

```sh
$ yarn add react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0
```

## Usage

```js
import React from 'react';
import usePromise from 'react-use-promise';

function Example() {
  const [result, error] = usePromise(() => new Promise(resolve => {
    setTimeout(() => resolve('foo'), 2000);
  }));

  return (
    <p>
      {result || error}
    </p>
  );
}
```

## API

```js
usePromise(() => Promise): [any, any]
```

Receives a function that returns a promise and returns a tuple
with the promise's result and error.

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT

import { render } from 'react-dom';
import React, { useMemo } from 'react';
import usePromise from '../src';

const Example = () => {
  const [result, error] = usePromise(useMemo(
    () => new Promise(resolve => {
      setTimeout(() => resolve('foo'), 2000);
    }),
    []
  ));

  return (
    <p>
      {result || error}
    </p>
  );
};

render(<Example />, document.getElementById('root'));

import { render } from 'react-dom';
import React from 'react';
import usePromise from '../src';

const Example = () => {
  const [result, error] = usePromise(() => new Promise(resolve => {
    setTimeout(() => resolve('foo'), 2000);
  }));

  if (error) {
    return (
      <p>
        {error.message}
      </p>
    );
  }

  return (
    <p>
      {result}
    </p>
  );
};

render(<Example />, document.getElementById('root'));

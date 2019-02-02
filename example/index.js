import { render } from 'react-dom';
import React, { useMemo } from 'react';
import usePromise from '../src';

const Example = () => {
  const [result, error, state] = usePromise(useMemo(
    () => new Promise(resolve => {
      setTimeout(() => resolve('foo'), 2000);
    }),
    []
  ));

  return (
    <>
      <p>
        {'State: '}
        {state}
      </p>

      {state === 'resolved' && (
        <p>
          {'Result: '}
          {result}
        </p>
      )}

      {state === 'rejected' && (
        <p>
          {'Error: '}
          {error}
        </p>
      )}
    </>
  );
};

render(<Example />, document.getElementById('root'));

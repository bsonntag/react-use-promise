import { render, wait } from 'react-testing-library';
import React from 'react';
import usePromise from '.';

const Test = ({ promise }) => {
  const [result, error] = usePromise(promise);

  return (
    <p>
      {error || result}
    </p>
  );
};

test('should return the resolved value', async () => {
  const app = <Test promise={() => Promise.resolve('foo')} />;
  const { container, rerender } = render(app);

  rerender(app);

  await wait(() => {
    expect(container.firstChild.textContent).toBe('foo');
  });
});

test('should return the rejected value', async () => {
  const app = <Test promise={() => Promise.reject('foo')} />;
  const { container, rerender } = render(app);

  rerender(app);

  await wait(() => {
    expect(container.firstChild.textContent).toBe('foo');
  });
});

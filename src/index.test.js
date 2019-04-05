import { act, cleanup, testHook } from 'react-testing-library';
import usePromise from '.';

class TestPromise {

  constructor() {
    this.resolvers = new Set();
    this.rejecters = new Set();
  }

  then(onResolve, onReject) {
    if (onResolve) {
      this.resolvers.add(onResolve);
    }
    if (onReject) {
      this.rejecters.add(onReject);
    }
  }

  catch(onReject) {
    if (onReject) {
      this.rejecters.add(onReject);
    }
  }

  resolve(result) {
    this.resolvers.forEach(resolver => resolver(result));
  }

  reject(error) {
    this.rejecters.forEach(rejecter => rejecter(error));
  }

}

afterEach(cleanup);

test('should return a `pending` state while the promise is resolving', () => {
  const promise = new TestPromise();
  let state;
  let result;
  let error;

  testHook(() => {
    [result, error, state] = usePromise(promise, []);
  });

  expect(result).toBe(undefined);
  expect(error).toBe(undefined);
  expect(state).toBe('pending');
});

test('should return the resolved value', () => {
  const promise = new TestPromise();
  let state;
  let result;
  let error;

  testHook(() => {
    [result, error, state] = usePromise(promise, []);
  });

  act(() => promise.resolve('foo'));

  expect(state).toBe('resolved');
  expect(result).toBe('foo');
  expect(error).toBe(undefined);
});

test('should return the rejected value', () => {
  const promise = new TestPromise();
  let result;
  let state;
  let error;

  testHook(() => {
    [result, error, state] = usePromise(promise, []);
  });

  act(() => promise.reject('foo'));

  expect(result).toBe(undefined);
  expect(state).toBe('rejected');
  expect(error).toBe('foo');
});

test('should return an undefined result if there is no promise', () => {
  let result;

  testHook(() => {
    [result] = usePromise(null, []);
  });

  expect(result).toBe(undefined);
});

test('should return to the pending state if the inputs change', () => {
  const promise = new TestPromise();
  let inputs = [false];
  let state;

  const { rerender } = testHook(() => {
    [,, state] = usePromise(promise, inputs);
  });

  act(() => promise.resolve('foo'));
  expect(state).toBe('resolved');

  inputs = [true];
  rerender();

  expect(state).toBe('pending');
});

test('should call the callback', () => {
  const callback = jest.fn(() => new TestPromise());

  testHook(() => {
    usePromise(callback, []);
  });

  expect(callback).toBeCalledTimes(1);
});

test('should call the callback again if the inputs change', () => {
  const callback = jest.fn(() => new TestPromise());
  let inputs = [false];

  const { rerender } = testHook(() => {
    usePromise(callback, inputs);
  });

  inputs = [true];
  rerender();

  expect(callback).toBeCalledTimes(2);
});

test('should rerun promise if refresh is called', () => {
  const callback = jest.fn(() => new TestPromise());
  let refresh;

  testHook(() => {
    [, , , refresh] = usePromise(callback, []);
  });

  expect(callback).toBeCalledTimes(1);
  act(() => {
    refresh();
  });
  expect(callback).toBeCalledTimes(2);
});

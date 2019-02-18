import { useEffect, useReducer } from 'react';

function resolvePromise(promise) {
  if (typeof promise === 'function') {
    return promise();
  }

  return promise;
}

const states = {
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved'
};

function reducer(state, action) {
  switch (action.type) {
    case states.pending:
      return {
        error: null,
        result: null,
        state: states.pending
      };

    case states.resolved:
      return {
        error: null,
        result: action.payload,
        state: states.resolved
      };

    case states.rejected:
      return {
        error: action.payload,
        result: null,
        state: states.rejected
      };

    /* istanbul ignore next */
    default:
      return state;
  }
}

function usePromise(promise, inputs) {
  const [{ error, result, state }, dispatch] = useReducer(reducer, {
    error: null,
    result: null,
    state: states.pending
  });

  useEffect(() => {
    promise = resolvePromise(promise);

    if (!promise) {
      return;
    }

    let canceled = false;

    dispatch({ type: states.pending });

    promise.then(
      result => !canceled && dispatch({
        payload: result,
        type: states.resolved
      }),
      error => !canceled && dispatch({
        payload: error,
        type: states.rejected
      })
    );

    return () => {
      canceled = true;
    };
  }, inputs);

  return [result, error, state];
}

export default usePromise;

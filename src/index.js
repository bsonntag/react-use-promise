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
        error: undefined,
        result: undefined,
        state: states.pending
      };

    case states.resolved:
      return {
        error: undefined,
        result: action.payload,
        state: states.resolved
      };

    case states.rejected:
      return {
        error: action.payload,
        result: undefined,
        state: states.rejected
      };

    /* istanbul ignore next */
    default:
      return state;
  }
}

function usePromise(promise, inputs) {
  const [{ error, result, state }, dispatch] = useReducer(reducer, {
    error: undefined,
    result: undefined,
    state: states.pending
  });

  function runPromise() {
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
  }

  useEffect(runPromise, inputs);

  return [result, error, state, runPromise];
}

export default usePromise;

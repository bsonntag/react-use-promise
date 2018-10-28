import { useEffect, useState } from 'react';

function resolvePromise(promise) {
  if (typeof promise === 'function') {
    return promise();
  }

  return promise;
}

function usePromise(promise) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    promise = resolvePromise(promise);

    if (!promise) {
      return;
    }

    let canceled = false;

    promise.then(
      result => !canceled && setResult(result),
      error => !canceled && setError(error)
    );

    return () => {
      canceled = true;
    };
  }, [promise]);

  return [result, error];
}

export default usePromise;

import { useEffect, useState } from 'react';

function usePromise(promise) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;

    promise().then(
      result => !canceled && setResult(result),
      error => !canceled && setError(error)
    );

    return () => {
      canceled = true;
    };
  }, []);

  return [result, error];
}

export default usePromise;

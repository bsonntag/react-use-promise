declare function usePromise<Result = any>(
  promise: Promise<Result> | (() => Promise<Result>),
  deps?: Array<any>
): [
  Result,
  Error,
  'pending' | 'resolved' | 'rejected'
];

export default usePromise;

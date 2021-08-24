type PendingState = [undefined, undefined, 'pending'];
type ResolvedState<Result> = [Result, undefined, 'resolved'];
type RejectedState = [undefined, Error, 'rejected'];

declare function usePromise<Result = any>(
  promise: Promise<Result> | (() => Promise<Result>) | undefined,
  deps?: Array<any>
): PendingState | ResolvedState<Result> | RejectedState;

export default usePromise;

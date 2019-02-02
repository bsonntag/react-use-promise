"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function resolvePromise(promise) {
  if (typeof promise === 'function') {
    return promise();
  }

  return promise;
}

var states = {
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

function usePromise(promise) {
  var _useReducer = (0, _react.useReducer)(reducer, {
    error: null,
    result: null,
    state: states.pending
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      error = _useReducer2$.error,
      result = _useReducer2$.result,
      state = _useReducer2$.state,
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    promise = resolvePromise(promise);

    if (!promise) {
      return;
    }

    var canceled = false;
    dispatch({
      type: states.pending
    });
    promise.then(function (result) {
      return !canceled && dispatch({
        payload: result,
        type: states.resolved
      });
    }, function (error) {
      return !canceled && dispatch({
        payload: error,
        type: states.rejected
      });
    });
    return function () {
      canceled = true;
    };
  }, [promise]);
  return [result, error, state];
}

var _default = usePromise;
exports.default = _default;
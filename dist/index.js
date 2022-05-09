"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
var defaultState = {
  error: undefined,
  result: undefined,
  state: states.pending
};

function reducer(state, action) {
  switch (action.type) {
    case states.pending:
      return defaultState;

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
  var _useReducer = (0, _react.useReducer)(reducer, defaultState),
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
  }, inputs);
  return [result, error, state];
}

var _default = usePromise;
exports["default"] = _default;
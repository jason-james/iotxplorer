// @flow
import isBrowser from "is-browser";
import thunk from "redux-thunk";
import window from "global/window";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./root-reducer";
import type { Reducer } from "./root-reducer";

export function configureStore(
  initialState: { base: any },
  reducer: Reducer = rootReducer
) {
  const middleware = [];
  if (isBrowser) {
    middleware.push(thunk);
  }

  const enhancers = [applyMiddleware(...middleware)];

  if (isBrowser && window && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(reducer, initialState, compose(...enhancers));
}

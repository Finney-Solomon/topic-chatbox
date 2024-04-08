import { applyMiddleware, compose, createStore } from "redux";
import { reducer } from "./reducer";
import { thunk } from "redux-thunk";

const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);

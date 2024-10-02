/**
 * configureStore module
 *
 * Handle all redux middleware and generate redux store with redux-persist
 */

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";

/* Development only */
// import { composeWithDevTools } from "redux-devtools-expo-dev-plugin";

import persistedReducers from "./reducers";

export default () => {
  /* Production only */
  let store = createStore(
    persistedReducers,
    applyMiddleware(thunk),
  );
  /* Development only */
  // let store = createStore(
  //   persistedReducers,
  //   composeWithDevTools(applyMiddleware(thunk))
  // );
  let persistor = persistStore(store);
  return { store, persistor };
};

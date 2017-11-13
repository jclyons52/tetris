// @flow

import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from "./reducers";

const middleware = applyMiddleware(logger)
const store = createStore(
  reducer, 
  middleware
  // autoRehydrate()
)
// persistStore(store)

export default store
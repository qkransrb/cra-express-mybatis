import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

const initialState = {};

const middlewares =
  process.env.NODE_ENV === "production" ? [thunk] : [thunk, logger];

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

export default createStore(reducers, initialState, enhancer);

import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer.js";

export default createStore(userReducer, applyMiddleware(promiseMiddleware));

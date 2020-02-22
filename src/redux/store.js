import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer.js";
import moodReducer from "./moodReducer.js";

const rootReducer = combineReducers({ userReducer, moodReducer });

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));

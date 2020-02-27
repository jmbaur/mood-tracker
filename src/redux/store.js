import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer.js";
import moodReducer from "./moodReducer.js";
import markReducer from "./markReducer.js";

const rootReducer = combineReducers({ userReducer, moodReducer, markReducer });

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));

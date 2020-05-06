import axios from "axios";
import formatMoods from "../utils/formatMoods.js";

const initialState = {
  username: "",
  moods: [],
  titleColor: "#ffffff",
  loading: false,
  loggedIn: false,
  hamburgerMenu: false
};

const GET_SESSION = "GET_SESSION";
const GET_MOODS = "GET_MOODS";
const SET_TITLE_COLOR = "SET_TITLE_COLOR";
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const TOGGLE_MENU = "TOGGLE_MENU";

export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios({
      method: "get",
      url: "/auth/session"
    }).then(res => res.data)
  };
}

export function getMoods() {
  return {
    type: GET_MOODS,
    payload: axios({
      method: "get",
      url: "/api/moods"
    }).then(res => res.data.moods)
  };
}

export function setTitleColor(color) {
  return {
    type: SET_TITLE_COLOR,
    payload: color
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: axios({
      method: "post",
      url: "/auth/login",
      data: user
    }).then(res => res.data)
  };
}

export function logout() {
  axios({ method: "get", url: "/auth/logout" });
  return { type: LOGOUT };
}

export function toggleMenu(status) {
  return {
    type: TOGGLE_MENU,
    payload: status
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SESSION + "_PENDING":
      return { ...state, loading: true };
    case GET_SESSION + "_FULFILLED":
      return {
        ...state,
        username: action.payload.username,
        loggedIn: !!action.payload.username,
        loading: false
      };
    case GET_SESSION + "_REJECTED":
      return { ...state, username: "", loading: false };
    case GET_MOODS + "_FULFILLED":
      return { ...state, moods: formatMoods(action.payload) };
    case SET_USER + "_PENDING":
      return { ...state, loading: true };
    case SET_USER + "_FULFILLED":
      return {
        ...state,
        username: action.payload.username,
        loggedIn: true,
        loading: false
      };
    case SET_USER + "_REJECTED":
      window.alert("Incorrect username or password.");
      console.log(action.payload);
      return { ...state, username: "", loading: false, loggedIn: false };
    case SET_TITLE_COLOR:
      return { ...state, titleColor: action.payload };
    case LOGOUT:
      return { ...state, username: "", loggedIn: false, titleColor: "#ffffff" };
    case TOGGLE_MENU:
      return { ...state, hamburgerMenu: action.payload };
    default:
      return state;
  }
}

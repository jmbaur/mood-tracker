import axios from "axios";

const initialState = {
  username: "",
  moods: [],
  titleColor: localStorage.getItem("titleColor") || "#ffffff",
  loading: false,
  loggedIn: false,
  hamburgerMenu: false
};

const GET_SESSION = "GET_SESSION";
const SET_MOODS = "SET_MOODS";
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

export function setMoods(moods) {
  return {
    type: SET_MOODS,
    payload: moods
  };
}

export function setTitleColor(color) {
  localStorage.setItem("titleColor", color);
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
  localStorage.clear();
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
    case SET_MOODS:
      return { ...state, moods: action.payload };
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

import axios from "axios";

const initialState = {
    user: {},
    title: "default",
    loading: false,
    loggedIn: false,
    hamburgerMenu: false
};

const GET_SESSION = "GET_SESSION";
const SET_TITLE = "SET_TITLE";
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const TOGGLE_MENU = "TOGGLE_MENU";

export function getSession() {
    return {
        type: GET_SESSION,
        payload: axios.get("/auth/session").then(res => res.data)
    };
}

export function setTitle(color) {
    return {
        type: SET_TITLE,
        payload: color
    };
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: axios.post("/auth/login", user).then(res => res.data)
    };
}

export function logout() {
    axios.get("/auth/logout");
    return { type: LOGOUT };
}

export function toggleMenu(status) {
    return {
        type: TOGGLE_MENU,
        payload: status
    };
}

export default function userReducer(state = initialState, action) {
    // console.log("REDUCER: ", action);
    switch (action.type) {
        case GET_SESSION + "_PENDING":
            return { ...state, user: {}, loading: true };
        case GET_SESSION + "_FULFILLED":
            return {
                ...state,
                user: action.payload,
                loggedIn: !!action.payload,
                loading: false
            };
        case GET_SESSION + "_REJECTED":
            return { ...state, user: {}, loading: false };
        case SET_USER + "_PENDING":
            return { ...state, loading: true };
        case SET_USER + "_FULFILLED":
            return {
                ...state,
                user: action.payload,
                loggedIn: true,
                loading: false
            };
        case SET_USER + "_REJECTED":
            alert("Incorrect username or password.");
            return { ...state, loading: false };
        case SET_TITLE:
            return { ...state, title: action.payload };
        case LOGOUT:
            return { ...state, user: {}, loggedIn: false, title: "default" };
        case TOGGLE_MENU:
            return { ...state, hamburgerMenu: action.payload };
        default:
            return state;
    }
}

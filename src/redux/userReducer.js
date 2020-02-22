import axios from "axios";

const initialState = {
    user: {},
    loading: false,
    loggedIn: false
};

const GET_SESSION = "GET_SESSION";
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

export function getSession() {
    const res = axios
        .get("/auth/session")
        .catch(err => console.log("getSession Error: ", err));
    let payload;
    res.data ? (payload = res.data) : (payload = {});

    return { type: GET_SESSION, payload };
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    };
}

export function logout() {
    const res = axios
        .get("/auth/logout")
        .catch(err => console.log("logout error: ", err));
    console.log(res.data);
    return { type: LOGOUT };
}

export default function userReducer(state = initialState, action) {
    console.log("REDUCER: ", action);
    switch (action.type) {
        case GET_SESSION:
            return { ...state, user: action.payload };
        case SET_USER:
            return { ...state, user: action.payload, loggedIn: true };
        case LOGOUT:
            return { ...state, user: {}, loggedIn: false };
        default:
            return state;
    }
}

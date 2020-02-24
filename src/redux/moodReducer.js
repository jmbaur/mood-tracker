import axios from "axios";

const initialState = {
    title: "default",
    marks: [],
    loading: false
};

const SET_TITLE = "SET_TITLE";
const ADD_MARK = "ADD_MARK";
const GET_MARKS = "GET_MARKS";

export function setTitle(color) {
    return {
        type: SET_TITLE,
        payload: color
    };
}

export function addMark(mark) {
    return {
        type: ADD_MARK,
        payload: axios.post("/api/mark", mark).then(res => res.data)
    };
}

export function getMarks(user_id) {
    return {
        type: GET_MARKS,
        payload: axios.post("/api/marks", user_id).then(res => res.data)
    };
}

export default function moodReducer(state = initialState, action) {
    console.log("MOOD REDUCER ", action);
    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.payload };
        case ADD_MARK + "_PENDING":
            return { ...state, loading: true };
        case ADD_MARK + "_FULFILLED":
            return { ...state, loading: false, marks: action.payload };
        case GET_MARKS + "_PENDING":
            return { ...state, loading: true };
        case GET_MARKS + "_FULFILLED":
            return { ...state, loading: false, marks: action.payload };
        default:
            return state;
    }
}

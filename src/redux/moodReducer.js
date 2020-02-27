import axios from "axios";

const initialState = {
    title: "default",
    marks: [],
    marksDetail: [],
    moods: [],
    loading: false
};

const SET_TITLE = "SET_TITLE";
const ADD_MARK = "ADD_MARK";
const GET_MARKS = "GET_MARKS";
const GET_MARKS_DETAILED = "GET_MARKS_DETAILED";
const GET_MOODS = "GET_MOODS";

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
        payload: axios
            .get(`/api/marks/?user_id=${user_id}`)
            .then(res => res.data)
    };
}

export function getMarksDetailed(user_id) {
    return {
        type: GET_MARKS_DETAILED,
        payload: axios
            .get(`/api/marks_detail/?user_id=${user_id}`)
            .then(res => res.data)
    };
}

export function getMoods(user_id) {
    return {
        type: GET_MOODS,
        payload: axios.get(`/api/moods/${user_id}`).then(res => res.data)
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
        case GET_MARKS_DETAILED + "_PENDING":
            return { ...state, loading: true };
        case GET_MARKS_DETAILED + "_FULFILLED":
            return { ...state, loading: false, marksDetail: action.payload };
        case GET_MOODS + "_FULFILLED":
            return { ...state, moods: action.payload };
        default:
            return state;
    }
}

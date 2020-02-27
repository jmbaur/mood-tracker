import axios from "axios";

const initialState = {
    title: "default",
    moods: [],
    loading: false
};

const SET_TITLE = "SET_TITLE";
const GET_MOODS = "GET_MOODS";

export function setTitle(color) {
    return {
        type: SET_TITLE,
        payload: color
    };
}

export function getMoods(user_id) {
    return {
        type: GET_MOODS,
        payload: axios.get(`/api/moods/${user_id}`).then(res => res.data)
    };
}

export default function moodReducer(state = initialState, action) {
    // console.log("MOOD REDUCER ", action);
    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.payload };
        case GET_MOODS + "_FULFILLED":
            return { ...state, moods: action.payload };
        default:
            return state;
    }
}

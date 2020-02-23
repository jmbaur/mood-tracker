const initialState = {
    title: "default"
};

const SET_TITLE = "SET_TITLE";

export function setTitle(color) {
    return {
        type: SET_TITLE,
        payload: color
    };
}

export default function moodReducer(state = initialState, action) {
    console.log("MOOD REDUCER ", action);
    switch (action.type) {
        case SET_TITLE:
            return {...state, title: action.payload}
        default:
            return state;
    }
}

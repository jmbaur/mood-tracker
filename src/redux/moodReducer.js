const initialState = {
    moods: [],
    loading: false
};

const SET_MOODS = "SET_MOODS";

export function setMoods(moods) {
    return {
        type: SET_MOODS,
        payload: moods
    };
}

export default function moodReducer(state = initialState, action) {
    console.log("MOOD REDUCER ", action);
    switch (action.type) {
        case SET_MOODS + "_PENDING":
            return { ...state, moods: [], loading: true };
        case SET_MOODS + "_FULFILLED":
            return { ...state, moods: action.payload, loading: false };
        case SET_MOODS + "_REJECTED":
            return { ...state, moods: [], loading: false };
        default:
            return state;
    }
}

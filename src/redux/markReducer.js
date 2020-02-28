import axios from "axios";
const initialState = {
    marks: [],
    marksDetail: [],
    marksDetailFilter: [],
    recentMark: {},
    loading: false,
    loadingFilter: false
};

const ADD_MARK = "ADD_MARK";
const GET_MARKS = "GET_MARKS";
const GET_MARKS_DETAILED = "GET_MARKS_DETAILED";
const GET_MARKS_DETAILED_FILTERED = "GET_MARKS_DETAILED_FILTERED";

export function addMark(mark) {
    return {
        type: ADD_MARK,
        payload: axios.post("/api/mark", mark).then(res => res.data[0])
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

export function getMarksDetailedFiltered(user_id, filter) {
    return {
        type: GET_MARKS_DETAILED_FILTERED,
        payload: axios.get(
            `/api/marks_detail_filter/?user_id=${user_id}?filter=${filter}`
        )
    };
}

export default function marksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MARK + "_PENDING":
            return { ...state, loading: true };
        case ADD_MARK + "_FULFILLED":
            return { ...state, loading: false, recentMark: action.payload };
        case GET_MARKS + "_PENDING":
            return { ...state, loading: true };
        case GET_MARKS + "_FULFILLED":
            return { ...state, loading: false, marks: action.payload };
        case GET_MARKS_DETAILED + "_PENDING":
            return { ...state, loading: true };
        case GET_MARKS_DETAILED + "_FULFILLED":
            return { ...state, loading: false, marksDetail: action.payload };
        case GET_MARKS_DETAILED_FILTERED + "_PENDING":
            return { ...state, loadingFilter: true };
        case GET_MARKS_DETAILED_FILTERED + "_FULFILLED":
            return {
                ...state,
                loadingFilter: false,
                marksDetailFilter: action.payload
            };
        default:
            return state;
    }
}

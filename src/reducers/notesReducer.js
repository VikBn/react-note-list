import * as CONSTANTS from "../constants"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    snackBar: {
        open: false,
        message: ""
    }
};


const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_NOTES_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case CONSTANTS.GET_NOTES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            }
        case CONSTANTS.GET_NOTES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case CONSTANTS.CLEAR_ERROR:
            return {
                ...state,
                isError: false
            }
        case CONSTANTS.ADD_NOTE:
            return {
                ...state,
                data: [...state.data, action.payload],
            }
        case CONSTANTS.EDIT_NOTE_SUCCESS:
            return {
                ...state,
                data: state.data.map(item => item.id !== action.payload.id ? item : action.payload),
            }
        case CONSTANTS.SNACKBAR_OPEN:
            return {
                ...state,
                snackBar: {
                    open: true,
                    message: action.payload
                },
            }
        case CONSTANTS.SNACKBAR_CLOSE:
            return {
                ...state,
                snackBar: {
                    open: false,
                    message: ""
                },
            }
        case CONSTANTS.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                data: state.data.filter(item => item.id !== action.payload),
            }
        default:
            return state;
    }
};

export default notesReducer;

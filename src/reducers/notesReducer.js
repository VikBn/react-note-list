import {CONSTANTS} from "../actions";

const initialState = [];


const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_NOTE:
            const newNote = {
                title: action.payload.title,
                content: action.payload.content,
            };

            return [...state, newNote];
        default:
            return state;
    }
};

export default notesReducer;
import {CONSTANTS} from "../actions";

let noteID = 2;

const initialState = [];


const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_NOTE:
            console.log('ss',state);
            const newNote = {
                title: action.payload.title,
                content: action.payload.content,
                id: noteID
            };
            noteID += 1;

            return [...state, newNote];
        default:
            return state;
    }
};

export default notesReducer;
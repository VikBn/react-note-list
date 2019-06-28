import {CONSTANTS} from './index';

export const addNote = (title, content, noteID) => {
    return {
        type: CONSTANTS.ADD_NOTE,
        payload: {
            title,
            content,
            noteID
        }
    }
};
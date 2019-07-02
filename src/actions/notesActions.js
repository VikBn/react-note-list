import * as CONSTANTS from "../constants"
import {serviceApi} from "../services/api"

export const getNotes = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CONSTANTS.GET_NOTES_LOADING
            });
            const res = await serviceApi.call({
                url: '/notes',
            });

            dispatch({
                type: CONSTANTS.GET_NOTES_SUCCESS,
                payload: res.data.notes
            })
        } catch (error) {
            dispatch({
                type: CONSTANTS.GET_NOTES_ERROR,
            })
        }
    }
};

export const clearError = () => ({
    type: CONSTANTS.CLEAR_ERROR,
});

export const createNote = (note) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CONSTANTS.CREATE_NOTE_LOADING
            });
            const res = await serviceApi.call({
                method: 'POST',
                url: '/notes',
                data: {
                    title: note.title,
                    content: note.content,
                }
            });
            dispatch(updatePreviousDataAction({
                type: 'create',
                note: res.data
            }));
            dispatch({
                type: CONSTANTS.ADD_NOTE,
                payload: res.data
            });
            dispatch({
                type: CONSTANTS.SNACKBAR_OPEN,
                payload: 'Note created success'
            })
        } catch (error) {
            dispatch({
                type: CONSTANTS.SNACKBAR_OPEN,
                payload: 'Note created error'
            })
        }
    }
};

export const editNote = (note) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CONSTANTS.EDIT_NOTE_LOADING
            });
            const res = await serviceApi.call({
                method: 'PATCH',
                url: `notes/${note.id}`,
                data: {
                    title: note.title,
                    content: note.content
                }
            });
            dispatch({
                type: CONSTANTS.EDIT_NOTE_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONSTANTS.SNACKBAR_OPEN,
                payload: 'Note edited error'
            })
        }
    }
};

export const addNote = note => ({
    type: CONSTANTS.ADD_NOTE,
    payload: note
});

export const closeSnackBar = () => ({
    type: CONSTANTS.SNACKBAR_CLOSE
});

export const deleteNote = (note) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CONSTANTS.DELETE_NOTE_LOADING
            });
            await serviceApi.call({
                method: 'DELETE',
                url: `notes/${note.id}`

            });
            dispatch(updatePreviousDataAction({
                type: "delete",
                note
            }));
            dispatch({
                type: CONSTANTS.DELETE_NOTE_SUCCESS,
                payload: note.id
            });
            dispatch({
                type: CONSTANTS.SNACKBAR_OPEN,
                payload: 'Note deleted success'
            })
        } catch (error) {
            dispatch({
                type: CONSTANTS.SNACKBAR_OPEN,
                payload: 'Note deleted error'
            })
        }
    }
};

export const updatePreviousDataAction = (action) => ({
    type: CONSTANTS.UPDATE_PREVIOUS_DATA_ACTION,
    payload: action
});

export const revertAction = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const previousDataAction = state.notes.previousDataAction;
            if (previousDataAction.type === "create") {
                dispatch(deleteNote(previousDataAction.note))
            }

            if (previousDataAction.type === "delete") {
                dispatch(createNote(previousDataAction.note))
            }
        } catch (error) {
        }
    }
};

import React from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/notesActions';

class DeleteNote extends React.Component {

    onDeleteNote = () => {
        this.props.dispatch(deleteNote(this.props.id))
    };

    render() {
        return (
            <React.Fragment>
                <Fab size="small"
                     onClick={this.onDeleteNote}
                     aria-label="Delete">
                    <DeleteIcon />
                </Fab>
            </React.Fragment>
        )
    }
}

export default connect()(DeleteNote)

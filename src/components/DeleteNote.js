import React from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {deleteNote} from '../actions/notesActions';

class DeleteNote extends React.Component {

    onDeleteNote = () => {
        this.props.dispatch(deleteNote(this.props.note))
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Fab size="small"
                     onClick={this.onDeleteNote}
                     aria-label="Delete"
                     className={classes.fab}
                >
                    <DeleteIcon/>
                </Fab>
            </React.Fragment>
        )
    }
}

export default connect()(DeleteNote)

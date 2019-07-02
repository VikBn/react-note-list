import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from './Modal';
import {createNote} from '../actions/notesActions';
import {connect} from 'react-redux';

class CreateNote extends React.Component {
    state = {
        openModal: false
    };

    onOpenModal = () => {
        this.setState({
            openModal: true
        })
    };

    onCloseModal = () => {
        this.setState({
            openModal: false
        })
    };

    onCreateNote = async (note) => {
        try {
            await this.props.dispatch(createNote(note));
            this.onCloseModal()
        } catch (error) {
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Fab
                    onClick={this.onOpenModal}
                    variant="extended"
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                >
                    <AddIcon/>
                    Create Note
                </Fab>
                {this.state.openModal &&
                <Modal
                    closeModal={this.onCloseModal}
                    onSubmit={this.onCreateNote}
                />
                }
            </React.Fragment>
        )
    }
}

export default connect()(CreateNote);

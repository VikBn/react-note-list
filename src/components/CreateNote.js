import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from './Modal';
import {serviceApi} from '../services/api';

export default class CreateNote extends React.Component {
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

    onCreateNote = async ({ title, content, id }) => {
        try {
            const res = await serviceApi.call({
                method: 'POST',
                url: '/notes',
                data: {
                    title: title,
                    content: content,
                    id: id
                }
            });
            this.props.addNote(res);
            this.onCloseModal()
        } catch (error) {
            console.log('submit error', error)
        }
    };

    render() {
        return (
            <>
                <Fab onClick={this.onOpenModal} variant="extended" color="primary" aria-label="Add">
                    <AddIcon/>
                    Create Note
                </Fab>
                {this.state.openModal &&
                <Modal
                    closeModal={this.onCloseModal}
                    onSubmit={this.onCreateNote}
                />
                }
            </>
        )
    }
}
import React from 'react';
import Fab from '@material-ui/core/Fab';
import Modal from './Modal';
import {serviceApi} from "../services/api"
import EditIcon from '@material-ui/icons/Edit';

export default class EditNote extends React.Component {
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

    onEditNote = async ({title, content}) => {
        try {
            const res = await serviceApi.call({
                method: "PATCH",
                url: `notes/${this.props.note.id}`,
                data: {
                    ...this.props.note,
                    title,
                    content
                }
            });
            this.props.editNote(res.data);
            this.onCloseModal()
        } catch (error) {
            console.log('submit error', error)
        }
    };

    render() {
        const {note} = this.props;
        return (
            <>
                <Fab size="small" onClick={this.onOpenModal} color="secondary" aria-label="Edit">
                    <EditIcon/>
                </Fab>
                {this.state.openModal &&
                <Modal
                    closeModal={this.onCloseModal}
                    onSubmit={this.onEditNote}
                    editMode
                    defaultTitle={note.title}
                    defaultContent={note.content}
                />
                }
            </>
        )
    }
}
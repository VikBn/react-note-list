import React from 'react';
import Fab from '@material-ui/core/Fab';
import Modal from './Modal';
import EditIcon from '@material-ui/icons/Edit';
import { editNote } from "../actions/notesActions"
import { connect } from "react-redux"

class EditNote extends React.Component {
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

  onEditNote = async ({ title, content }) => {
    try {
      await this.props.dispatch(editNote({
        id: this.props.note.id,
        title,
        content
      }));
      this.onCloseModal()
    } catch (error) { }
  };

  render() {
    const { note } = this.props;
    return (
      <React.Fragment>
        <Fab size="small" onClick={this.onOpenModal} color="secondary" aria-label="Edit">
          <EditIcon />
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
      </React.Fragment>
    )
  }
}

export default connect()(EditNote)

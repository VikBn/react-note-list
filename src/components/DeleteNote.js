import React from 'react';
import Fab from '@material-ui/core/Fab';
import {serviceApi} from "../services/api"
import DeleteIcon from '@material-ui/icons/Delete';

export default class DeleteNote extends React.Component {

  onDeleteNote = async (id) => {
    try {
      const res = await serviceApi.call({
        method: 'DELETE',
        url: `notes/${id}`
      });
      await this.props.getNotes();
      this.props.deleteNote(res.id)
    } catch (error) {
      console.log('delete error', error)
    }
  };

  render() {
    const {id} = this.props;

    return (
      <>
        <Fab
          size="small"
          onClick={() => this.onDeleteNote(id)}
          aria-label="Delete"
        >
          <DeleteIcon/>
        </Fab>
      </>
    )
  }
}

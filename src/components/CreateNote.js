import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class CreateNote extends React.Component {
    state = {
        openModal: false
    };

    onOpenModal = () => {
        this.setState({
            openModal: true
        })
    };

    render() {
        return (
            <React.Fragment>
                <Fab onClick={this.onOpenModal} variant="extended" color="primary" aria-label="Add">
                    <AddIcon/>
                    Create Note
                </Fab>
            </React.Fragment>
        )
    }
}

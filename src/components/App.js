import React, {Component} from 'react';
import {connect} from 'react-redux'
import NotesActionButton from "./NotesActionButton";
import NotesList from './NotesList';
// import uuid from 'uuid';
import axios from 'axios';
import Modal from './Modal';
import CustomButton from './CustomButton';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../loader/Loader'

class App extends Component {
    state = {
        notes: [],
        id: Date.now(),
        item: '',
        title: '',
        content: '',
        editNote: false,
        isModal: false,
        snackbarOpen: false,
        snackBarMsg: '',
        isLoader: true,
    };

    snackBarClose = e => {
        this.setState({
            snackbarOpen: false
        })
    };

    handleChange = e => {
        if (e.target.name === 'noteTitle') {
            this.setState({
                title: e.target.value,
                errorTitle: ''
            })
        } else {
            this.setState({
                content: e.target.value,
                inputContent: ''
            })
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            id: Date.now()
        };

        axios({
            method: 'post',
            mode: 'cors',
            url: 'notes',
            headers: {Authorization: "Bearer ca7b29ljd8piu7iq4g8k0fiwyuwiyrtuwyot"},
            data: newNote
        })
            .then(() => {
                    this.setState({
                        title: '',
                        content: '',
                        isModal: false,
                        snackbarOpen: true,
                        snackBarMsg: 'test'
                    }, () => console.log(this.state.notes))
                }
            )
            .then(() => {
                this.getNotes();
            })
            .catch(error => console.log(error))
    };

    handleDelete = id => {
        fetch(`notes/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {Authorization: "Bearer ca7b29ljd8piu7iq4g8k0fiwyuwiyrtuwyot"}
        })
            .then(() => this.getNotes())
            .catch(error => console.log('delete error', error))
    };

    handleEdit = id => {
        const selectedNote = this.state.notes.find(item => item.id === id);

        this.setState({
            title: selectedNote.title,
            content: selectedNote.content,
            editNote: true,
            isModal: true,
            id: id
        })
    };

    updateNote = () => {
        const updatedNote = {
            title: this.state.title,
            content: this.state.content,
            id: this.state.id
        };

        axios(`notes/${this.state.id}`, {
            mode: 'cors',
            method: "PATCH",
            headers: {Authorization: "Bearer ca7b29ljd8piu7iq4g8k0fiwyuwiyrtuwyot"},
            data: updatedNote
        })
            .then(() => {
                    this.setState({
                        title: '',
                        content: '',
                        isModal: false,
                        editNote: false
                    })
                }
            )
            .then(() => {
                this.getNotes();
            })
    };

    openModal = () => {
        this.setState({
            isModal: true
        })
    };

    closeModal = () => {
        this.setState({
            isModal: false,
            title: '',
            content: ''
        })
    };

    snackBarStop = () => {
        alert('stop');
    };

    getNotes = () => {
        fetch('notes', {
            method: 'GET',
            mode: 'cors',
            headers: {Authorization: "Bearer ca7b29ljd8piu7iq4g8k0fiwyuwiyrtuwyot"}
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    notes: data.notes,
                    isLoader: false
                })
            }).catch(error => console.log('get error',error))

        // axios(`notes`, {
        //     mode: 'cors',
        //     method: "GET",
        //     headers: {
        //         Authorization: `Bearer 0unf3pj33xt4d9bf2vb0xahwyuwoooyioqqy`
        //     }})
        //     .then(res => res)
        //     .then(data => {
        //         console.log(data);
        //         this.setState({
        //             notes: data.notes,
        //             isLoader: false
        //         })
        //     }).catch(error => console.log('get error',error))
    };

    componentDidMount() {
        axios({
            method: 'post',
            mode: 'cors',
            url: 'tokens',
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify({
                userName: "VikBn"
            })
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => console.log('token error', error));

        // fetch('tokens', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         userName: "VikBn"
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data));

        this.getNotes();

    }

    render() {
        return (
            <div className="App">
                {
                    this.state.isLoader
                        ? <Loader/>
                        : <>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.snackbarOpen}
                                autoHideDuration={2000}
                                onClose={this.snackBarClose}
                                message={<span id="message-id">{this.state.snackBarMsg}</span>}
                                action={[
                                    <Button key="undo" color="secondary" size="small" onClick={this.snackBarStop}>
                                        UNDO
                                    </Button>,
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={this.snackBarClose}
                                    >
                                        <CloseIcon/>
                                    </IconButton>,
                                ]}
                            />
                            <CustomButton title='Create Note' openModal={this.openModal}>Create</CustomButton>

                            <NotesList
                                props={this.state.notes}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                            />
                            {
                                this.state.isModal
                                    ?
                                    <Modal
                                        errorTitle={this.state.errorTitle}
                                        title={this.state.title}
                                        content={this.state.content}
                                        handleChange={this.handleChange}
                                        handleSubmit={this.handleSubmit}
                                        handleDelete={this.handleDelete}
                                        updateNote={this.updateNote}
                                        closeModal={this.closeModal}
                                        editNote={this.state.editNote}
                                    />
                                    : null
                            }
                        </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    notes: state.notes
});

export default connect(mapStateToProps)(App);

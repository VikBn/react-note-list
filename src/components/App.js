import React, { Component } from 'react';
import NotesList from './NotesList';
import uuid from 'uuid';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../loader/Loader'
import Cookies from "js-cookie"
import { serviceApi } from "../services/api"

class App extends Component {

    state = {
        notes: [],
        id: uuid(),
        item: '',
        title: '',
        content: '',
        editNote: false,
        isModal: false,
        snackbarOpen: false,
        snackBarMsg: '',
        isLoader: true,
        hasError: null
    };

    componentDidMount() {
        this.getInitialData()
    }

    updateError = value => {
        this.setState({
            hasError: value
        })
    };

    getInitialData = async () => {
        try {
            await this.getToken();
            await this.getNotes()
        } catch (error) {
            this.updateError(true)
        }
    };

    getToken = async () => {
        try {
            if (Cookies.get("application_token")) return;
            const res = await serviceApi.call({
                url: '/tokens',
                method: 'POST',
                withToken: false,
                data: JSON.stringify({
                    userName: "VikBn"
                })
            });
            serviceApi.setToken(res.data.token)
        } catch (error) {
            throw error
        }

    };

    getNotes = async () => {
        try {
            const res = await serviceApi.call({
                url: '/notes',
            });
            this.setState({
                notes: res.data.notes,
                isLoader: false
            })
        } catch (error) {
            throw error
        }
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

    handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const newNote = {
                title: this.state.title,
                content: this.state.content,
                id: uuid()
            };
            await serviceApi.call({
                method: 'POST',
                url: '/notes',
                data: newNote
            });
            this.setState({
                title: '',
                content: '',
                isModal: false,
                snackbarOpen: true,
                snackBarMsg: 'test'
            });
            await this.getNotes()
        } catch (error) {
            console.log('submit error', error)
        }
    };

    handleDelete = async (id) => {
        try {
            await serviceApi.call({
                method: 'DELETE',
                url: `notes/${id}`

            });
            await this.getNotes()
        } catch (error) {
            console.log('delete error', error)
        }
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

    updateNote = async () => {
        try {
            const updatedNote = {
                title: this.state.title,
                content: this.state.content,
                id: this.state.id
            };
            await serviceApi.call({
                method: "PATCH",
                url: `notes/${this.state.id}`,
                data: updatedNote
            });

            this.setState({
                title: '',
                content: '',
                isModal: false,
                editNote: false
            });
            await this.getNotes();
        } catch (error) {
            console.log('patch error', error)
        }
    };

    openModal = () => {
        this.setState({
            isModal: true
        })
    };

    closeModal = () => {
        this.setState({
            isModal: false,
            editNote: false,
            title: '',
            content: ''
        })
    };

    snackBarStop = () => {
        alert('stop');
    };



    reloadPage = () => {
        this.updateError(null)
        this.getInitialData()
    }

    render() {
        if (this.state.hasError) {
            return <div><button type="button" onClick={this.reloadPage}>Reload page</button></div>
        }
        return (
            <div className="App">
                {
                    this.state.isLoader
                        ? <Loader />
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
                                        <CloseIcon />
                                    </IconButton>,
                                ]}
                            />

                            <NotesList
                                props={this.state.notes}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                                openModal={this.openModal}
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

export default App;

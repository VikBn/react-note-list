import React, {Component} from 'react';
import NotesList from './NotesList';
import SnackBar from './SnackBar';
import Loader from '../loader/Loader'
import {serviceApi} from "../services/api"

class App extends Component {

    state = {
        notes: [],
        item: '',
        title: '',
        content: '',
        editNote: false,
        isLoader: true,
        hasError: null,
        snackBar: {
            open: false,
            message: ''
        }
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
            if (serviceApi.getToken()) return;
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

    closeSnackBar = () => {
        this.setState(state => ({
            ...state,
            snackBar: {
                ...state.snackBar,
                open: false
            }
        }))
    };

    onRevertAction = () => {
        console.log("revert action")
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
                editNote: false
            });
            await this.getNotes();
        } catch (error) {
            console.log('patch error', error)
        }
    };

    addNote = (note) => {
        this.setState(state => ({
            notes: [...state.notes, note],
            snackBar: {
                ...state.snackBar,
                open: true,
                message: 'Note created success'
            }
        }))
    };

    reloadPage = () => {
        this.updateError(null);
        this.getInitialData()
    };

    render() {
        if (this.state.hasError) {
            return <div>
                <button type="button" onClick={this.reloadPage}>Reload page</button>
            </div>
        }
        return (
            <div className="App">
                {
                    this.state.isLoader
                        ? <Loader/>
                        : <>
                            <SnackBar
                                open={this.state.snackBar.open}
                                message={this.state.snackBar.message}
                                onClose={this.closeSnackBar}
                                onCancel={this.onRevertAction}
                            />
                            <NotesList
                                notes={this.state.notes}
                                handleDelete={this.handleDelete}
                                handleEdit={this.handleEdit}
                                addNote={this.addNote}
                            />
                        </>
                }
            </div>
        );
    }
}

export default App;

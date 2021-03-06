import React, {Component} from 'react';
import NotesList from './NotesList';
import SnackBar from './SnackBar';
import Loader from '../loader/Loader';
import Header from './Header';
import {serviceApi} from '../services/api';
import {connect} from 'react-redux';
import {getNotes, clearError, closeSnackBar, revertAction} from "../actions/notesActions"

class App extends Component {
    componentDidMount() {
        this.getInitialData()
    }

    getInitialData = async () => {
        try {
            await this.getToken();
            await this.props.dispatch(getNotes())
        } catch (error) {
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

    onCloseSnackBar = () => {
        this.props.dispatch(closeSnackBar())
    };

    onRevertAction = () => {
        console.log("revert action");
        this.props.dispatch(revertAction())
    };

    reloadPage = () => {
        this.props.dispatch(clearError());
        this.getInitialData()
    };
    render() {
        if (this.props.isError) {
            return <div>
                <button type='button' className='css-custom-button' onClick={this.reloadPage}>Reload page</button>
            </div>
        }
        return (
            <div className='App'>
                {
                    this.props.isLoading
                        ? <Loader/>
                        : <>
                            <SnackBar
                                open={this.props.snackBar.open}
                                message={this.props.snackBar.message}
                                onClose={this.onCloseSnackBar}
                                onCancel={this.onRevertAction}
                            />
                            <Header/>
                            <NotesList/>
                        </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isError: state.notes.isError,
    isLoading: state.notes.isLoading,
    snackBar: state.notes.snackBar
});

export default connect(mapStateToProps)(App);

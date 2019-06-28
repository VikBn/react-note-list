import React, {Component} from 'react';
import '../App.css';
import NoteItem from "./NoteItem";
import {connect} from 'react-redux'
import NotesActionButton from "./NotesActionButton";


class App extends Component {
    render() {
        const {notes} = this.props;
        console.log('props',this.props);
        return (
            <div className="App">
                <NotesActionButton/>
                {notes.map(item => {
                    return <NoteItem key={item.id + 1} props={item}/>
                })}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    notes: state.notes
});

export default connect(mapStateToProps)(App);

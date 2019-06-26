import React, {Component} from 'react';
import axios from 'axios';
import NoteItem from './NoteItem';
import {notes} from '../data';
export default class NotesList extends Component {

    state = {
        notes: notes
    };

    componentDidMount() {
        // this.setToken();
        // this.getNotes();

    }

    setToken() {
        fetch('http://159.89.96.181/api/v1/tokens', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userName: "VikBn"
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    };

    getNotes() {
        fetch('http://159.89.96.181/api/v1/notes', {
            method: 'GET',
            mode: 'cors',
            headers: {Authorization: "Bearer nc5i5hk084lgbqsuhaxil8gwyuwyupwyewyt"}
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    notes: data
                })
            })
    }

    addNotes = () => {
        console.log(this.state.notes);
    };

    render() {
        const {notes} =this.state;
        return (
            <>
                {notes.map(item => {
                    return <NoteItem key={item.id} props={item} />
                })}


                <div onClick={this.addNotes}>
                    hello
                </div>

            </>
        )
    }
}
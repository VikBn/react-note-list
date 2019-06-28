import React, {Component} from 'react';
import TextArea from 'react-textarea-autosize';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {addNote} from "../actions";

class NotesActionButton extends Component {

    state = {
        notes: [],
        isFormOpen: false,
        title: '',
        content: '',
        id: Date.now()
    };

    openForm = () => {
        this.setState({
            isFormOpen: true
        })
    };

    closeForm = () => {
        this.setState({
            isFormOpen: false,
            title: '',
            content: ''
        })
    };

    handleInputChange = e => {
        this.setState({
            title: e.target.value
        })
    };

    handleTextChange = e => {
        this.setState({
            content: e.target.value
        })
    };

    handleAddNote = () => {
      const {dispatch} = this.props;
      const {title} = this.state;
      const {content} = this.state;

      if(title) {
          dispatch(addNote(title, content));
          this.setState({
              isFormOpen: false,
              title: '',
              content: '',
          })
      }

        return;
    };

    render() {
        // console.log(this.props);
        const {isFormOpen} = this.state;
        return (
            <>
                {isFormOpen
                    ? (
                    <ModalWrapper>
                        <div id='modal'>
                            <div>Title</div>
                            <input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                autoFocus
                                type="text"
                            />
                            <div>Content</div>
                            <TextArea
                                value={this.state.content}
                                onChange={this.handleTextChange}
                            />
                            <div>
                                <button onClick={this.handleAddNote}>add</button>
                                <button onClick={this.closeForm}>Cancel</button>
                            </div>
                        </div>
                    </ModalWrapper>
                )
                    : <button onClick={this.openForm}>add note</button>
                }
            </>
        )
    }
}

export default connect()(NotesActionButton);

const ModalWrapper = styled.div`
position: fixed;
left: 0;
top: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,.3);
display: flex;
align-items: center;
justify-content: center;

#modal {
    background: #fff;
    padding: 24px;
   }
`;
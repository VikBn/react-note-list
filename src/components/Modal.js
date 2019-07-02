import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export default class Modal extends React.Component {
    static defaultProps = {
        defaultTitle: '',
        defaultContent: '',
        editMode: false
    };

    constructor(props) {
        super(props);

        this.state = {
            title: props.defaultTitle,
            content: props.defaultContent,
            id: Date.now()
        }
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit({
            title: this.state.title,
            content: this.state.content,
            id: this.state.id
        })
    };

    render() {
        const { title, content } = this.state;
        const { closeModal, editMode } = this.props;
        console.log(this.props);
        return (
            <ModalContainer>
                <div id='modal'>
                    <div className='modal_content'>
                        <div>
                            <i className="material-icons v-align-sub">
                                {editMode ? 'create' : 'description'}
                            </i>
                            {editMode ? 'Edit Note' : 'New Note'}
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className='modal__input'>
                                <h5>Title</h5>
                                <TextField
                                    autoFocus
                                    value={title}
                                    onChange={this.onChange}
                                    required
                                    id="standard-required"
                                    placeholder="Enter Title"
                                    margin="normal"
                                    name='title'
                                    fullWidth
                                />
                            </div>
                            <div>
                                <h5>Content</h5>
                                <TextField
                                    placeholder="Enter Content"
                                    required
                                    multiline
                                    rows={2}
                                    rowsMax={4}
                                    value={content}
                                    onChange={this.onChange}
                                    name='content'
                                    fullWidth
                                />
                            </div>
                            <div className='modal__buttons'>
                                <Button type='submit' variant="contained" color="primary">
                                    {editMode ? "Edit" : "Create"}
                                </Button>
                                <Button
                                    onClick={closeModal}
                                    component="span"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalContainer>
        )
    }
}

const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .modal_content {
        border: 1px solid #e2e2e2
        padding: 24px;
    }

    #modal {
        background: #ffffff;
        
        padding: 24px 24px 46px;
        position: relative;
        width: 90%;
    }

    .modal__buttons {
        margin-top: 24px;
    }

    .modal__input {
        margin: 24px 0;
    }

    .v-align-sub {
        vertical-align: sub;
    }
`;
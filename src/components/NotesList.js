import React from 'react';
import NoteItem from './NoteItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default ({props, handleDelete, handleEdit, openModal}) => {
    return (
        <>
            <Container maxWidth="lg">
                <h1>React Notes List</h1>

                <Fab onClick={openModal} variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    Create Note
                </Fab>

                <Grid container spacing={3}>
                    {props ? props.map(item => {
                        return <NoteItem
                            key={item.id}
                            note={item}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    }) : null}
                </Grid>
            </Container>
        </>
    )
}
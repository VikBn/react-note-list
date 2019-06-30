import React from 'react';
import NoteItem from './NoteItem';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CreateNote from "./CreateNote"

export default ({notes, handleDelete, handleEdit}) => {
    return (
        <>
            <Container maxWidth="lg">
                <h1>React Notes List</h1>
                <CreateNote/>
                <Grid container spacing={3}>
                    {notes.length > 0 ? notes.map(item => {
                        return <NoteItem
                            key={item.id}
                            note={item}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    }) : <p>No notes</p>}
                </Grid>
            </Container>
        </>
    )
}
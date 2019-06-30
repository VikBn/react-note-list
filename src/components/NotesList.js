import React from 'react';
import NoteItem from './NoteItem';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default ({props, handleDelete, handleEdit}) => {
    // console.log('noteslist',props);
    return (
        <>
            <Container maxWidth="lg">
                <h3 className='text-center'>Notes List</h3>
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
import React from 'react';
import NoteItem from './NoteItem';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CreateNote from './CreateNote';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
}));

const NotesList = ({notes}) => {
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="lg">
                <CreateNote classes={classes}/>
                <Grid container spacing={3}>
                    {notes.length > 0 ? notes.map(item => {
                        return <NoteItem
                            key={item.id}
                            note={item}
                            classes={classes}
                        />
                    }) : <h3>No notes</h3>}
                </Grid>
            </Container>
        </>
    )
};

const mapStateToProps = state => ({
    notes: state.notes.data
});

export default connect(mapStateToProps)(NotesList)
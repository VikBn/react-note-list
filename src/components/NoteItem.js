import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditNote from "./EditNote"
import DeleteNote from "./DeleteNote";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    media: {
        height: 140,
    },
}));

export default ({ note, getNotes, editNote, deleteNote }) => {
    const { id, title, content } = note;
    const classes = useStyles();
    return (

        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content}
                    </Typography>
                    <div>
                        <EditNote note={note} editNote={editNote} />
                        <DeleteNote id={id} getNotes={getNotes} deleteNote={deleteNote} />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}
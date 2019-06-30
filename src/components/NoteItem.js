import React from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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

export default ({note, handleDelete, handleEdit}) => {
    const {id, title, content} = note;
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
                        <Fab size="small" onClick={() => handleEdit(id)} color="secondary" aria-label="Edit" className={classes.fab}>
                            <EditIcon/>
                        </Fab>
                        <Fab size="small" onClick={() => handleDelete(id)} aria-label="Delete" className={classes.fab}>
                            <DeleteIcon />
                        </Fab>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}
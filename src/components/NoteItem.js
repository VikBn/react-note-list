import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';

export default ({ note, classes }) => {
    const { title, content } = note;

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
                        <EditNote note={note} />
                        <DeleteNote classes={classes} note={note} />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

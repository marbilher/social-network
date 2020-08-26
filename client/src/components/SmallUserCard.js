import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

function SmallUserCard(props) {
    let useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tall: {
            height: '75vh',
        },
        short: {
            height: '8vh',
        },
        media: {
            height: 222,
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <Grid item style={{ flexGrow: 1 }}>
                        <Grid container spacing={0} justify="center" alignItems="stretch">
                            {/* <Grid item xs={12} sm={4} direction="column"> */}

                            <CardMedia title="User photo">
                                <img className={classes.media} src={require('../img/default_photo.png')} />
                            </CardMedia>
                            {/* </Grid> */}
                        </Grid>
                    </Grid>
                </CardActionArea>
                <Grid container spacing={0} justify="center" alignItems="stretch">
                    <Grid item xs={12} direction="column">

                    <Typography  variant="h4" align="center">
                        {props.userIDContext}
                    </Typography>
                    </Grid>
                    <Grid item xs={12} direction="column">
                    <Typography gutterBottom align="center">
                        {'Allow a user quote here?'}
                    </Typography>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default SmallUserCard;

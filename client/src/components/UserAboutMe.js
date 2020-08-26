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

function UserAboutMe(props) {
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
                            <Grid item xs={12} sm={4} direction="column">
                                <CardMedia title="User photo">
                                    <img className={classes.media} src={require('../img/default_photo.png')} />
                                </CardMedia>
                            </Grid>
                            <Grid item xs={12} sm={8} direction="column">
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {props.userIDContext}
                                    </Typography>
                                    {!props.isEditState ? (
                                        <div>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {props.userAboutMeText}
                                            </Typography>
                                            <Button size="small" color="primary" onClick={props.toggleEditState}>
                                                Edit
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <TextField
                                                id="standard-multiline-static"
                                                inputRef={(input) => input && input.focus()}
                                                multiline
                                                rows={10}
                                                InputProps={{ fontSize: '10px', disableUnderline: true }}
                                                InputLabelProps={{ fontSize: '10px' }}
                                                // className={classes.paper}
                                                style={{ width: '100%', height: '30%' }}
                                                value={props.userAboutMeText}
                                                onChange={(e) => props.setUserAboutMeText(e.target.value)}
                                                onKeyPress={(ev) => {
                                                    if (ev.key === 'Enter') {
                                                        props.editProfileInfoSubmit();
                                                        props.toggleEditState();
                                                    }
                                                }}
                                            ></TextField>
                                            <Button size="small" color="primary" onClick={props.toggleEditState}>
                                                Save
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Upload new profile picture
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default UserAboutMe;

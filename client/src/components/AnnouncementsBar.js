import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText';


function AnnouncementBar(props) {
    let useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(1),
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
        announcements: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1, 2, 1),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root} style={{maxHeight: 335}}>
                <CardActionArea>
                    <Grid item style={{ flexGrow: 1 }}>
                
                        <Grid container spacing={0} justify="center">
                            <Grid item xs={12} sm={6} direction="column">
                                <CardMedia title="Site logo">
                                    <img className={classes.media} style={{width:'75%', height: '75%'}} fill={'red'} src={require('../svg/gt3logo.svg')} />
                                </CardMedia>
                            </Grid>

                            <Grid item xs={12} sm={6} direction="column" style={{maxHeight: 250, overflow: 'auto'}} >
                            <List dense={true}>
                                {props.adminAnnouncements.map((content) => {
                                    return <Box className={classes.announcements}>
                                                <ListItemText primary={content.headlineText} styles={classes} className={classes.root} variant="body2">
                                                </ListItemText>
                                            </Box>
                                })}
                            </List>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default AnnouncementBar;

import React, { useStyles, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

function LoggedInNavbar(props) {
    const useStyles = makeStyles((theme) => ({
        paper: {
            textAlign: 'center',
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            {['Home', 'Chat', 'Profile'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={(e) => console.log(e)} component={Link} to={'/' + anchor}>
                        {anchor}
                    </Button>
                </React.Fragment>
            ))}
            <br/>
        </div>
    );
}

export default LoggedInNavbar;

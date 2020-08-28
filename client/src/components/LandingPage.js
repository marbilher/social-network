import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2),
    },
    header: {
        fontSize: '60px',
        textAlign: 'center',
    },
}));

function LandingPage() {
    const classes = useStyles();

    // useEffect(() => {
    //     const tempID = makeID(10);  //Replace with cookies
    //     localStorage.setItem('tempID', tempID);
    //     _setUserIdentification(tempID);
    //     socket.emit('clientRegisterUserOnline', tempID);
    //     socket.on('serverSendNewMessage', function (data) {
    //         setMessages((messages) => [...messages, data]);
    //     });
    // }, []);

    return (
        <div className="App-header">
            <h1 className={classes.header}>
                Greater <br /> Than <br /> Three
            </h1>
            <header>
                <Button className={classes.button} variant="outlined" color="primary" component={Link} to="/login">
                    Log-in
                </Button>
                <Button className={classes.button} variant="outlined" color="secondary" component={Link} to="/signup">
                    Sign up
                </Button>
                <Button
                    // onClick={() => guestJoin()}
                    className={classes.button}
                    variant="outlined"
                    color="default"
                    component={Link}
                    to="/profile"
                >
                    Guest
                </Button>
            </header>
        </div>
    );
}

export default LandingPage;

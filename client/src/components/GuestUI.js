import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField';
import ChatMessageDisplay from './ChatMessageDisplay';
import ChatCurrentlyOnline from './ChatCurrentlyOnline';
import { socket } from '../util/ClientSocket';
import { makeID } from '../util/GenerateID';
import { useEffect } from 'react';
import LoggedInNavbar from './LoggedInNavbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    tall: {
        height: '75vh',
    },
    short: {
        height: '8vh',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        //   color: theme.palette.text.secondary,
        // outlineColor: 'black',
        // outlineStyle: 'solid',
    },
}));

function GuestUI() {
    const classes = useStyles();
    const [inputFieldText, setInputFieldText] = React.useState('');
    const [userIdentification, _setUserIdentification] = React.useState('');

    const [messages, setMessages] = React.useState([]);
    const [currentlyOnline, setCurrentlyOnline] = React.useState([]);

    useEffect(() => {
        socket.on('serverEmitCurrentlyOnline', function (data) {
            let newState = currentlyOnline;
            if(!newState.includes(data)) {
                newState.push(data)
            }
            setCurrentlyOnline(newState)
        });
    }, [currentlyOnline])

    useEffect(() => {
        const tempID = makeID(10);  //Replace with cookies
        localStorage.setItem('tempID', tempID);
        _setUserIdentification(tempID);
        socket.emit('clientRegisterUserOnline', tempID);
        socket.on('serverSendNewMessage', function (data) {
            setMessages((messages) => [...messages, data]);
        });
    }, []);

    function chatSubmit() {
        let newMessage = {
            userIdentification: userIdentification,
            text: inputFieldText,
        };
        socket.emit('clientSendNewMessage', newMessage);
        setInputFieldText('');
    }

    return (
        <div>
        <LoggedInNavbar styles={classes}/>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <ChatMessageDisplay classes={classes} messages={messages} />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <ChatCurrentlyOnline classes={classes} currentlyOnline={currentlyOnline} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ChatTextField
                        setInputFieldText={setInputFieldText}
                        chatSubmit={chatSubmit}
                        inputFieldText={inputFieldText}
                    />
                </Grid>
            </Grid>
        </div>
        </div>
    );
}

export default GuestUI;

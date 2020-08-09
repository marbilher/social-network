import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField';
import ChatMessageDisplay from './ChatMessageDisplay';
import ChatCurrentlyOnline from './ChatCurrentlyOnline';
import {socket} from '../util/ClientSocket';
import {makeID} from '../util/GenerateID';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    tall: {
        height: '80vh',
    },
    short: {
        height: '8vh',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        //   color: theme.palette.text.secondary,
        outlineColor: 'black',
        outlineStyle: 'solid',
    },
}));

function GuestUI() {
    const classes = useStyles();
    const [inputFieldText, setInputFieldText] = React.useState('');
    const [userIdentification, _setUserIdentification] = React.useState(localStorage.getItem('tempID'));

    const [messages, setMessages] = React.useState([]);
    const [currentlyOnline, setCurrentlyOnline] = React.useState([userIdentification]);


    useEffect(() => {
        const tempID = makeID(10)
        localStorage.setItem('tempID', tempID);
        _setUserIdentification(tempID);
        socket.emit('registerUserOnline', tempID)
        socket.on('newMessage', function (data) {
            console.log('received from server ' + JSON.stringify(data));
            setMessages((messages) => [...messages, data]);
            setInputFieldText('');
        });
    
        socket.on('currentlyOnline', function (data) {
            // if (!currentlyOnline.includes(data.tempID)) {
                setCurrentlyOnline((user) => [...user, data]);
            // }
        });

    }, [])



    function chatSubmit() {
        let newMessage = {
            userIdentification: userIdentification,
            text: inputFieldText,
        };
        socket.emit('newMessage', newMessage);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <ChatMessageDisplay classes={classes} messages={messages} />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <ChatCurrentlyOnline currentlyOnline={currentlyOnline} />
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
    );
}

export default GuestUI;

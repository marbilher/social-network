import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ChatBoxMessage from './ChatBoxMessage';

function ChatMessageDisplay(props) {
    return (
        <Paper className={props.classes.tall} variant="outlined">
            {props.messages.map(message => {
                return <ChatBoxMessage message={message} key={message.uniqueID} />;
            })}
        </Paper>
    );
}

export default ChatMessageDisplay;

import React, { useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

function ChatCurrentlyOnline(props) {
    const userName = {
        color: 'red',
        fontStyle: 'bold',
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(scrollToBottom, [props.currentlyOnline]);
    const messagesEndRef = useRef(null);

    return (
        <Paper
            // className={userName}
            variant="outlined"
            // className={props.classes.tall}
            // style={{ maxHeight: '100%', overflow: 'auto' }}
        >
        <Typography>
            Currently Online:
        </Typography>
            {props.currentlyOnline.map((user) => {
                return <p key={user}>&nbsp;{user}</p>;
            })}
            <div ref={messagesEndRef} />
        </Paper>
    );
}

export default ChatCurrentlyOnline;

import React, { useEffect, useRef }  from 'react';
import Paper from '@material-ui/core/Paper';
import ChatBoxMessage from './ChatBoxMessage';

function ChatMessageDisplay(props) {

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(scrollToBottom, [props.messages]);
    const messagesEndRef = useRef(null);

    return (
        <Paper
            id="scrollingContainer"
            style={{ maxHeight: '100%', overflow: 'auto' }}
            className={props.classes.tall}
            variant="outlined"
        >
            {props.messages.map((message) => {
                return <ChatBoxMessage message={message} key={message.uniqueID} />;
            })}
            <div ref={messagesEndRef} />
        </Paper>
    );
}

export default ChatMessageDisplay;

import React from 'react';

function ChatBoxMessage(props) {
    const userName = {
        color: 'red',
        fontStyle: 'bold',
    };
    return (
        <div style={{ margin: '1rem' }}>
            <span style={userName}>{props.message.userIdentification}: </span>
            <span>{props.message.text}</span>
        </div>
    );
}

export default ChatBoxMessage;

import React, { useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import {List, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';

function FriendList(props) {
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
            className={props.classes.root}
            // variant="outlined"
            // className={props.classes.tall}
            // style={{ maxHeight: '100%', overflow: 'auto' }}
        >
        <Typography>
            Friends:
        </Typography>
            <List alignItems="flex-start">
                {props.currentlyOnline.map((user) => {
                    return <div>
                        {/* Create component with dropdown for friends/whispers */}
                        <ListItemAvatar style={{display: 'inline-block'}}>
                            <Avatar alt="Remy Sharp" src={user.image} />
                        </ListItemAvatar>
                        <ListItemText style={{display: 'inline-block'}} key={user.name}>&nbsp;{user.name}</ListItemText>
                        </div>
                })}
                <div ref={messagesEndRef} />
            </List>
        </Paper>
    );
}

export default FriendList;

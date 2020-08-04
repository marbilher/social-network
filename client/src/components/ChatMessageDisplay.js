import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ChatBoxMessage from './ChatBoxMessage';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//       padding: theme.spacing(2),

//     },
//     tall: {
//       height: '80vh'
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//     //   color: theme.palette.text.secondary,
//       height: '80vh'
//     },
//   }));


function ChatMessageDisplay(props) {
    // const classes = makeStyles();

  return (

          <Paper 
            className={props.classes.tall} 
            variant="outlined">
            {props.messages.map(message => {
                return <ChatBoxMessage message={message}/>
            })}
          </Paper>
  );
}

export default ChatMessageDisplay;
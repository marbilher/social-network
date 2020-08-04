import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),

    },
    tall: {
      height: '80vh'
    },
    short: {
        height:'8vh'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    //   color: theme.palette.text.secondary,
      outlineColor: 'black',
      outlineStyle: 'solid'
    },
  }));

function ChatMessageDisplay(props) {


  return (

          <Paper className={classes.tall} 
          variant="outlined">
          </Paper>
  );
}

export default ChatMessageDisplay;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField'

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

function GuestUI() {
  const classes = useStyles();
  const [ inputFieldText, setInputFieldText] = React.useState("Chat");
  const [ messages, setMessages ] = React.useState([])
  const [ currentlyOnline, setCurrentlyOnline ] = React.useState([])



  function chatSubmit() {
    setMessages(messages => [...messages, inputFieldText])
    setInputFieldText("")
    console.log(messages)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.tall} 
          variant="outlined">
          </Paper>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Paper className={classes.tall}
          variant="outlined">
          </Paper>
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
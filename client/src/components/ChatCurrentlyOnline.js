import React from 'react';
import Paper from '@material-ui/core/Paper';


function ChatCurrentlyOnline(props) {

    const userName = {
        color: "red",
        fontStyle: "bold"
    }

  return (
    <Paper className={userName} variant="outlined">
        {props.currentlyOnline.map(user => {
                return <p>{user}</p>
            })}
    </Paper>
  );
}

export default ChatCurrentlyOnline;
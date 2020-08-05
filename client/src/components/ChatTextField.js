import React from 'react';
import TextField from '@material-ui/core/TextField';

function ChatTextField(props) {

  return (
            <TextField
            id="outlined-multiline-static"
            label="Chat"
            multiline
            rows={4}
            style ={{width: '100%', height: '30%'}}
            value={props.inputFieldText}
            onChange={e => props.setInputFieldText(e.target.value)} 
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    props.chatSubmit()
                }
            }}
            variant="outlined"
            />
  );
}

export default ChatTextField;
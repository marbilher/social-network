import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    marginTop: 20
  }
}));

function Login() {
  const classes = useStyles();

  return (
    <div class="App-header">
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VisibilityOffIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<SendIcon />}
      >
        Log in
      </Button>

    </div>
  );
}

export default Login;
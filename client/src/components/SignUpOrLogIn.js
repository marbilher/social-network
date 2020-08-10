import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MailOutline from '@material-ui/icons/MailOutline';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        marginTop: 20,
    },
}));

export default function SignUpOrLogIn(props) {
    let { isSigningUp } = props;
    const classes = useStyles();
    let [showPassword, setShowPassword] = useState(true);

    return (
        <div class="App-header">
            <FormControl className={classes.margin}>
                <TextField
                    className={classes.margin}
                    label={isSigningUp ? "Registration Email" : "Email"}
                    id="input-with-icon-textfield"
                    type="text"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <IconButton>
                          <MailOutline />
                        </IconButton>

                        </InputAdornment>)


                    }}
                />
                <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Password"
                    type={showPassword ? 'password' : 'text'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
              {isSigningUp ? 
                <TextField
                    label="Confirm Password"
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    type={showPassword ? 'password' : 'text'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                : '' }

                <Button variant="outlined" color="primary" className={classes.button} startIcon={<SendIcon />}>
      { isSigningUp ? "Sign Up" : "Log In" } 
                </Button>
            </FormControl>
        </div>
    );
}


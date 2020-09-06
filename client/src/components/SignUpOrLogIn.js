import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutline from '@material-ui/icons/MailOutline';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect } from 'react';


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
    let [state, setState] = React.useState({
        password: '',
        confirmationPassword: '',
        email: ''
    })

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', value => {
            if (value !== state.password) {
              return false;
            }
            return true;
          });
          ValidatorForm.addValidationRule('uniqueEmail', value => {
            if (value === state.inUse) {
              return false;
            }
            return true;
          });

    })
    
    let emailRef = React.createRef();

    let toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    let handleChange = (event) => {
        const {value,name} = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(state)

    }

    let onSubmit = event => {
        event.preventDefault();
        console.log('calling API')
        onSuccess('API response')
      };

    let onSuccess = user => {
        console.log('success' + user);
    };

    let onError = error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use' || errorCode === 'auth/invalid-email') {
            emailRef.current.makeInvalid();
        }
        setState({  //overwriting initial state object
            errorCode: errorCode,
            errorMessage: errorMessage,
            emailInUse: errorCode === 'auth/email-already-in-use' ? true : false,
            inUse: state.email
        });
    };

    let getError = () => {
    if (
        state.errorCode !== 'auth/email-already-in-use' &&
        state.errorCode !== 'auth/invalid-email'
    ) {
        return state.errorMessage;
    }
    return ' ';
    };

    return (
        <div class="App-header">
            <ValidatorForm className={classes.margin} onSubmit={onSubmit}>
                <TextValidator
                    className={classes.margin}
                    label={isSigningUp ? 'Registration Email' : 'Email'}
                    ref={emailRef}
                    id="input-with-icon-textfield"
                    type="text"
                    onChange={handleChange}
                    value={state.email}
                    name='email'
                    errorMessages={state.errorMessage}
                    validators={['required', 'isEmail','uniqueEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <MailOutline />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextValidator
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Password"
                    type={showPassword ? 'password' : 'text'}
                    onChange={handleChange}
                    value={state.password}
                    name='password'
                    validators={['matchRegexp:^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$']} //Decide on a regex here
                    errorMessages={['Password should be at least 8 characters']}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    value={state.showPassword}
                                    aria-label="toggle password visibility"
                                    onClick={() => toggleShowPassword()}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {isSigningUp ? (
                    <TextValidator
                        label="Confirm Password"
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        type={showPassword ? 'password' : 'text'}
                        onChange={handleChange}
                        value={state.confirmationPassword}
                        name='confirmationPassword'
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Passwords must match', 'This field is required']}
                        required
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
                ) : (
                    ''
                )}

                <Button type='submit' variant="outlined" color="primary" className={classes.button} startIcon={<SendIcon />}>
                    {isSigningUp ? 'Sign Up' : 'Log In'}
                </Button>
                </ValidatorForm>
        </div>
    );
}

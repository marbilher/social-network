import React, {useStyles} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField';
import { useEffect } from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import UserAboutMe from './UserAboutMe'

function UserProfile() {

    let useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    tall: {
        height: '75vh',
    },
    short: {
        height: '8vh',
    },
    media: {
        height: 140,
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    }));
    const classes = useStyles();
    const [inputFieldText, setInputFieldText] = React.useState('');
    const [userAboutMeText, setUserAboutMeText] = React.useState('');
    const [userIdentification, _setUserIdentification] = React.useState('');

    useEffect(() => {
        mockAPICall()
    }, [])

    function editProfileInfoSubmit() {
        // let newEditProfileInfo = {   //Save this to DB
        //     userIdentification: userIdentification,
        //     text: inputFieldText,
        // };
        setUserAboutMeText('');
    }


    function mockAPICall() {
        setTimeout(function(){ 
        setUserAboutMeText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
        }, 500);
    }

    return (
        <div>
        <LoggedInNavbar styles={classes}/>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <UserAboutMe 
                        userAboutMeText={userAboutMeText} 
                        setUserAboutMeText={setUserAboutMeText}
                        editProfileInfoSubmit={editProfileInfoSubmit}
                        classes={classes}/>
                </Grid>
            </Grid>
        </div>
        </div>
    );
}

export default UserProfile;
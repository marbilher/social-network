import React, {useStyles} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField';
import { useEffect } from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import UserAboutMe from './UserAboutMe'
import UserContext from "../util/UserContext";
import UserActionsCard from "./UserActionsCard"
import UserWall from "./UserWall"

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
    // const { userIDContext } = React.useContext(UserContext)
    const [isEditState, setIsEditState] = React.useState(false);
    const [userWallContent, setUserWallContent] = React.useState([])

    function generateFakeWallContent() {
        
        let fakeWallContent = {
            author: 'User name here',
            title: 'Hey whats up',
            image: 'https://picsum.photos/200',
            createDate: '11/12/20 04:12',
            text: 'Placeholder text',
            key: null
        }
        return fakeWallContent
    }

    const deleteUserWallContentBlock = (event, key) => {
        // event.preventDefault();
        console.log(event.currentTarget)
        console.log(event.target)
        console.log(key)
        setUserWallContent(userWallContent.filter(item => item.key !== key));
    }

    useEffect(() => {
        mockAPICall()
        for(let i = 0; i < 5; i++) {
            let faked = generateFakeWallContent()
            faked.key = (function() { return Math.random()})()
            setUserWallContent(oldContent => [...oldContent, faked])
        }
        // _setUserIdentification(userIDContext) = React.useContext(userIDContext)
    }, [])

    function editProfileInfoSubmit() {
        // let newEditProfileInfo = {   //Save this to DB
        //     userIdentification: userIdentification,
        //     text: inputFieldText,
        // };
        // setUserAboutMeText('');
    }

    const toggleEditState = () => {
        if(!isEditState) {
            setIsEditState(true);
        } else {
            setIsEditState(false)
        }
      };

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
                <UserContext.Consumer>
                    {userContext => (
                    <UserAboutMe 
                        userIDContext={userContext.userIDContext}
                        userAboutMeText={userAboutMeText} 
                        setUserAboutMeText={setUserAboutMeText}
                        editProfileInfoSubmit={editProfileInfoSubmit}
                        classes={classes}
                        isEditState={isEditState}
                        toggleEditState={toggleEditState}
                        />
                    )}
                    </UserContext.Consumer>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                        <UserActionsCard></UserActionsCard>
                </Grid>
                <Grid item xs={8}>
                        <UserWall userWallContent={userWallContent} deleteUserWallContentBlock={deleteUserWallContentBlock}></UserWall>
                </Grid>
            </Grid>
        </div>
        </div>
    );
}

export default UserProfile;
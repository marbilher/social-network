import React, { useStyles } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField';
import { useEffect } from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import UserAboutMe from './UserAboutMe';
import UserContext from '../util/UserContext';
import UserActionsCard from './UserActionsCard';
import UserWall from './UserWall';

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
    const [userWallContent, setUserWallContent] = React.useState([]);

    function generateFakeWallContent() {
        let fakeWallContent = {
            author: 'User name here',
            title: 'Hey whats up',
            image: 'https://picsum.photos/200',
            createDate: '11/12/20 04:12',
            text: 'Placeholder text',
            isEdit: false,
            key: null,
        };
        return fakeWallContent;
    }

    const deleteUserWallContentBlock = (event, key) => {
        setUserWallContent(userWallContent.filter((item) => item.key !== key));
    };

    const editUserAboutMeText = (event, key) => {
        setUserWallContent(
            userWallContent.map((content) => {
                if (content.key === key) return { ...content, text: event.target.value };
                return content;
            }),
        );
    };

    const updateUserWallContentBlockText = (event, key) => {
        //Refactor to prevent rerender
        setUserWallContent(
            userWallContent.map((content) => {
                //of everything in statehook array
                if (content.key === key) return { ...content, text: event.target.value };
                return content;
            }),
        );
    };

    const editUserWallContentBlock = (key) => {
        //can make this an isEdit toggle
        setUserWallContent(
            userWallContent.map((content) => {
                if (content.key === key) return { ...content, isEdit: !content.isEdit };
                return content;
            }),
        );
    };

    const addNewUserWallContentBlock = (text, title) => {
        let newWallContent = {
            author: 'username here',
            title: 'remove title',
            image: 'https://picsum.photos/200',
            createDate: '11/12/20 04:12',
            text: '',
            isEdit: true,
            key: null,
        };
        newWallContent.key = (function () {
            return Math.random();
        })();
        setUserWallContent((oldContent) => [...oldContent, newWallContent]);
    };

    useEffect(() => {
        mockAPICall();
        for (let i = 0; i < 2; i++) {
            let faked = generateFakeWallContent();
            faked.key = (function () {
                return Math.random();
            })();
            setUserWallContent((oldContent) => [...oldContent, faked]);
        }
        // _setUserIdentification(userIDContext) = React.useContext(userIDContext)
    }, []);

    function editProfileInfoSubmit() {
        // let newEditProfileInfo = {   //Save this to DB
        //     userIdentification: userIdentification,
        //     text: inputFieldText,
        // };
        // setUserAboutMeText('');
    }

    const toggleEditState = () => {
        if (!isEditState) {
            setIsEditState(true);
        } else {
            setIsEditState(false);
        }
    };

    function mockAPICall() {
        setTimeout(function () {
            setUserAboutMeText(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            );
        }, 500);
    }

    return (
        <React.Fragment>
            <LoggedInNavbar styles={classes}/>
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <UserContext.Consumer>
                        {(userContext) => (
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
                <Grid item xs={12} sm={4}>
                    <UserActionsCard></UserActionsCard>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <UserWall
                        userWallContent={userWallContent}
                        updateUserWallContentBlockText={updateUserWallContentBlockText}
                        editUserWallContentBlock={editUserWallContentBlock}
                        addNewUserWallContentBlock={addNewUserWallContentBlock}
                        deleteUserWallContentBlock={deleteUserWallContentBlock}
                    />
                </Grid>
            </Grid>
            </div>
        </React.Fragment>
    );
}

export default UserProfile;

import React, { useStyles } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import TextField from '@material-ui/core/TextField';
import ChatTextField from './ChatTextField';
import { useEffect } from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import UserContext from '../util/UserContext';
import UserActionsCard from './UserActionsCard';
import UserWall from './UserWall';
import SmallUserCard from './SmallUserCard';
import AnnouncementsBar from './AnnouncementsBar';
import FriendList from './FriendList'

function SiteHub() {
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
    const { currentlyOnline } = React.useContext(UserContext)
    const [isEditState, setIsEditState] = React.useState(false);
    const [userWallContent, setUserWallContent] = React.useState([]);
    const [adminAnnouncements, setAdminAnnouncements] = React.useState([]);

    function generateFakeAdminAnnouncements() {
        let announcement = {
            headlineText: "11/24/20 - Dr.Dave in chat @ 7PM PST",
            detailText: "Dr.Dave has been a pediatric oncologist for 12 years. He is going to answer questions about long term medical care.",
            key: null
        }
        return announcement
    }
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
        for (let i = 0; i < 5; i++) {
            let faked = generateFakeWallContent();
            let fakeAnnouncement = generateFakeAdminAnnouncements();
            faked.key = (function () {
                return Math.random();
            })();
            fakeAnnouncement.key = (function () {
                return Math.random();
            })();
            setUserWallContent((oldContent) => [...oldContent, faked]);
            setAdminAnnouncements((oldContent) => [...oldContent, fakeAnnouncement])
        }
        // _setUserIdentification(userIDContext) = React.useContext(userIDContext)
    }, []);

    const toggleEditState = () => {
        if (!isEditState) {
            setIsEditState(true);
        } else {
            setIsEditState(false);
        }
    };

    return (
        <React.Fragment>
            <LoggedInNavbar styles={classes}/>
            <div className={classes.root}>
            {/* https://stackoverflow.com/questions/45519275/grid-in-material-ui-causes-horizontal-scroll-react */}
            <Box style={{overflow: 'auto'}}>
            <Grid container spacing={1}>
                <Grid item sm={3}>
                    
                    <UserContext.Consumer>
                        {(userContext) => (
                            <Grid item>
                            <SmallUserCard
                                userIDContext={userContext.userIDContext}
                                userAboutMeText={userAboutMeText}
                                classes={classes}
                            />
                            </Grid>
                        )}
                    </UserContext.Consumer>  
                    <br/>

                    <Grid item>
                    <UserActionsCard></UserActionsCard>
                    </Grid>
                </Grid>
            <Grid item sm={6}>
                <Grid item>
                    <AnnouncementsBar adminAnnouncements={adminAnnouncements} />
                </Grid>
                <br/>

                <Grid item>
                    <UserWall
                        userWallContent={userWallContent}
                        
                        updateUserWallContentBlockText={updateUserWallContentBlockText}
                        editUserWallContentBlock={editUserWallContentBlock}
                        addNewUserWallContentBlock={addNewUserWallContentBlock}
                        deleteUserWallContentBlock={deleteUserWallContentBlock}
                    />
                </Grid>
            </Grid>
            
            <Grid item sm={3}>
                <Grid item>
                    <FriendList classes={classes} currentlyOnline={currentlyOnline} />
                </Grid>
            </Grid>
            </Grid>
            </Box>
            </div>
        </React.Fragment>
    );
}

export default SiteHub;

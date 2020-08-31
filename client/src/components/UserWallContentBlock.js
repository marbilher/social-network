import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function UserWallContentBlock(props) {
    let useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
        <Box style={{overflow: 'auto'}}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={props.content.image} />
            </ListItemAvatar>

            <ListItemText
                primary={
                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                            {props.content.author}
                        </Typography>
                }
            />
            {!props.content.isEdit ? (
                <Button
                    size="small"
                    color="primary"
                    onClick={(event) => props.editUserWallContentBlock(props.content.key)}
                >
                    Edit
                </Button>
            ) : (
                <Button
                    size="small"
                    color="primary"
                    onClick={(event) => props.editUserWallContentBlock(props.content.key)}
                >
                    Save
                </Button>
            )}

            <Button
                size="small"
                color="warning"
                onClick={(event) => props.deleteUserWallContentBlock(event, props.content.key)}
            >
                Delete
            </Button>
        </ListItem>
        {!props.content.isEdit ? (
            <Typography>
                {props.content.text}
                </Typography>
            ) : (
                <TextField
                    id="standard-multiline-static"
                    inputRef={(input) => input && input.focus()}
                    multiline
                    rows={10}
                    InputProps={{ fontSize: '10px', disableUnderline: true }}
                    InputLabelProps={{ fontSize: '10px' }}
                    // className={classes.paper}
                    style={{ width: '100%', height: '30%' }}
                    value={props.content.text}
                    onChange={(e) => props.updateUserWallContentBlockText(e, props.content.key)}
                    // onKeyPress={(ev) => {
                    //     if (ev.key === 'Enter') {
                    //         props.editProfileInfoSubmit();
                    //         props.toggleEditState();
                    //     }
                    // }}
                ></TextField>
            )}
    </Box>

        
    );
}

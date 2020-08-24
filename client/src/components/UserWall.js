import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import UserWallContentBlock from './UserWallContentBlock';
import Card from '@material-ui/core/Card';

export default function UserWall(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        //   maxWidth: '36ch',
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
        },
        inline: {
          display: 'inline',
        },
        blank: {
          padding: theme.spacing(2),
        }
      }));

      const classes = useStyles();

  return (
    <Card className={classes.root}>
      <List>
      {props.userWallContent.map((content) => {
          return <UserWallContentBlock content={content} deleteUserWallContentBlock={props.deleteUserWallContentBlock} key={content.key}/>
      })}
      </List>
    </Card>
  );
}
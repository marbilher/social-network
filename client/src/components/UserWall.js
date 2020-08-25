import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import UserWallContentBlock from './UserWallContentBlock';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';


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
      <Button size="small" color="primary" onClick={props.addNewUserWallContentBlock}>
        New Post
      </Button>  
      <List>
      {props.userWallContent.map((content) => {
        return <UserWallContentBlock 
                content={content} 
                editUserWallContentBlock={props.editUserWallContentBlock} 
                updateUserWallContentBlockText={props.updateUserWallContentBlockText} 
                deleteUserWallContentBlock={props.deleteUserWallContentBlock} 
                key={content.key}/>
      })}
      </List>
    </Card>
  );
}
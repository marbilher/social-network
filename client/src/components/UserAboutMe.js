import React, { useEffect, useRef }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";


function UserAboutMe(props) {

    let useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        tall: {
            height: '75vh',
        },
        short: {
            height: '8vh',
        },
        media: {
            height: 222,
          },
          paper: {
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            padding: theme.spacing(2, 4, 3),
          },
        }));

    // const [open, setOpen] = React.useState(false);

    // const handleOpen = () => {
    //     if(!open) {
    //         setOpen(true);
    //     } else {
    //         setOpen(false)
    //     }
    //   };
    
    // const handleClose = () => {
    //     setOpen(false);
    // };

    const classes = useStyles();

    // const body = (
    //     <div className={classes.paper}>
    //       <h2 id="simple-modal-title">Text in a modal</h2>
    //       <p id="simple-modal-description">
    //       {props.userAboutMeText}
    //       </p>
    //     </div>
    //   );

    return (
        <div>
        <Card className={classes.root}>
            <CardActionArea>
            <Grid item style={{ flexGrow: 1 }}>
            <Grid container spacing={0} justify="center" alignItems="stretch">
            <Grid item xs={4} direction="column">

                <CardMedia
                title="User photo"
                >
                <img  className={classes.media} src={require("../img/default_photo.png")}/>
                </CardMedia>
                </Grid>
                <Grid item xs={8} direction="column">
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.userIDContext}
                </Typography>
                {!props.isEditState ? 
                    <Typography variant="body2" color="textSecondary" component="p">                    
                    {props.userAboutMeText}
                        <Button size="small" color="primary" onClick={props.toggleEditState}>
                            Edit
                        </Button>
                    </Typography>
                    :
                    <div>
                    <TextField
                    id="standard-multiline-static"
                    inputRef={input => input && input.focus()}
                    multiline
                    rows={10}
                    InputProps={{fontSize: '10px', disableUnderline:true }} 
                    InputLabelProps={{fontSize: '10px'}} 
                    // className={classes.paper}
                    style={{ width: '100%', height: '30%' }}
                    value={props.userAboutMeText}
                    onChange={(e) => props.setUserAboutMeText(e.target.value)}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            props.editProfileInfoSubmit();
                            props.toggleEditState();
                        }
                    }}
                    >
                    </TextField>
                    <Button size="small" color="primary" onClick={props.toggleEditState}>
                            Save
                    </Button>  
                    </div>
                }
                </CardContent>
                </Grid>
                </Grid>
                </Grid>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Upload new profile picture
                </Button>
            </CardActions>
        </Card>
        {/* <Modal              //Better to allow user to directly edit textfield
            open={open}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >            
            <TextField
             id="standard-multiline-static"
            inputRef={input => input && input.focus()}
            multiline
            rows={20}
            className={classes.paper}
            style={{ width: '40%', height: '60%' }}
            value={props.userAboutMeText}
            onChange={(e) => props.setUserAboutMeText(e.target.value)}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    props.editProfileInfoSubmit();
                }
            }}
            >
            </TextField>
             <Button size="large" color="primary" onClick={() => props.editProfileInfoSubmit()}>
                Submit
            </Button>
        </Modal> */}
      </div>
    );
}

export default UserAboutMe;

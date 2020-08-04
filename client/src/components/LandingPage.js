import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
  header: {
    fontSize: "60px",
    textAlign: "center"
  }

}));

function LandingPage() {
  const classes = useStyles();

  function guestJoin() {
    localStorage.setItem('tempID', makeID(10));

  }

  function makeID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (

    <div className="App-header">
      <h1 className={classes.header}>Greater  <br/> Than <br/> Three</h1>
      <header >
        <Button className={classes.button} variant="outlined"  color="primary" component={Link} to="/login">
            Log-in
        </Button>
        <Button className={classes.button} variant="outlined"  color="secondary" component={Link} to="/signup">
            Sign up
        </Button>
        <Button onClick={guestJoin} className={classes.button} variant="outlined"  color="default" component={Link} to="/guestui">
            Guest
        </Button>
      </header>
    </div>

  );
}

export default LandingPage;
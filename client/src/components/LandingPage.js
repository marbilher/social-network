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

  return (

    <div className="App-header">
      <h1 className={classes.header}>Greater  <br/> Than <br/> Three</h1>
      <header >
        <Button className={classes.button} variant="contained"  color="primary" component={Link} to="/login">
            Log-in
        </Button>
        <Button className={classes.button} variant="contained"  color="secondary" component={Link} to="/signup">
            Sign up
        </Button>
        <Button className={classes.button} variant="contained"  color="default" component={Link} to="/guest">
            Guest
        </Button>
      </header>
    </div>

  );
}

export default LandingPage;
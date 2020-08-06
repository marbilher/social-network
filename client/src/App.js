import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import GuestUI from './components/GuestUI';

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/guestui" component={GuestUI} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;

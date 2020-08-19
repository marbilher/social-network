import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage';
import SignUpOrLogIn from './components/SignUpOrLogIn';
import GuestUI from './components/GuestUI';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/signup" component={() => <SignUpOrLogIn isSigningUp={true} />} />
                    <Route exact path="/login" component={() => <SignUpOrLogIn isSigningUp={false} />} />
                    <Route exact path="/guestui" component={GuestUI} />
                    <Route path="/profile" component={UserProfile}/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;

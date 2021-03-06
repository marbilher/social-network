import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage';
import SignUpOrLogIn from './components/SignUpOrLogIn';
import ChatUI from './components/ChatUI';
import UserProfile from './components/UserProfile';
import UserContext from './util/UserContext';
import makeID from './util/GenerateID';
import SiteHub from './components/SiteHub';

function App() {
    const userIDContext = makeID(10); //Replace with cookies
    const currentlyOnline = [
        {name:'Brie',
         image: 'https://picsum.photos/200' 
        },
        {name:'Cheddar',
         image: 'https://picsum.photos/200' 
        },
        {name:'Parmesan',
         image: 'https://picsum.photos/200' 
        },
         ]

    useEffect(() => {
        localStorage.setItem('tempID', userIDContext);
    }, []);

    return (
        <React.Fragment>
            {/* <CssBaseline> */}
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <UserContext.Provider value={{ userIDContext }}>
                                <LandingPage {...props} />
                            </UserContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/home"
                        render={(props) => (
                            <UserContext.Provider value={{ userIDContext, currentlyOnline }}>
                                <SiteHub {...props} />
                            </UserContext.Provider>
                        )}
                    />
                    <Route exact path="/signup" render={(props) => <SignUpOrLogIn isSigningUp={true} />} />
                    <Route exact path="/login" render={(props) => <SignUpOrLogIn isSigningUp={false} />} />
                    <Route
                        exact
                        path="/chat"
                        render={(props) => (
                            <UserContext.Provider value={{ userIDContext }}>
                                <ChatUI {...props} />
                            </UserContext.Provider>
                        )}
                    />
                    <Route
                        path="/profile"
                        render={(props) => (
                            <UserContext.Provider value={{ userIDContext }}>
                                <UserProfile {...props} />
                            </UserContext.Provider>
                        )}
                    />
                </Switch>
            </BrowserRouter>
            {/* </CssBaseline> */}
        </React.Fragment>
    );
}

export default App;

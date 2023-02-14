import React from 'react';
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';

import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

    return (
        <BrowserRouter>
        <GoogleOAuthProvider clientId="851953092132-sr7iu8fmsac40klq5jjs3c12ja5so16f.apps.googleusercontent.com">
        <Container maxWidth="lg">
            
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
            </Switch>
        </Container>
        </GoogleOAuthProvider>
        </BrowserRouter>
        
    );
}

export default App;
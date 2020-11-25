import React, { Component } from "react";

import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';

import Grid from '@material-ui/core/Grid';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            validUser: true,
        };
    }

    render()
    {
        const content = this.state.validUser ? <Home /> : <Login />
    
        return (
            <Grid container className='app-container' alignContent='center'
                justify='center' alignItems='center'>
                <Grid className='navbar-container' item sm={ 12 }>
                    <NavBar disableGutters validated={ this.state.validUser } />
                </Grid>
                { content }
            </Grid>
        );
    }
}

/*
   else
    return(
                <Grid container className = 'app-container' alignContent = 'center'
                    justify = 'center' alignItems = 'center' direction = 'column' >
                    <Grid className='navbar-container' item sm={ 12 }>
                        <NavBar disableGutters validated={ this.state.validUser } />
                    </Grid>
                    <Grid className='login-container' item sm={ 12 }>
                        <Login />
                    </Grid>
                </Grid>
            );
            */

export default App;

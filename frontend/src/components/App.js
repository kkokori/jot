import React, { Component } from "react";

import Login from './Login';
import NavBar from './NavBar';

import Grid from '@material-ui/core/Grid';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            validUser: false,
        };
    }

    render()
    {
        if (this.state.validUser)
            return (
                <Grid container alignContent='center' justify='center'
                    alignItems='center' direction='column' spacing={ 4 }>
                    <Grid className='navbar-container' item sm={ 12 }>
                        <NavBar validated={ this.state.validUser } />
                    </Grid>
                    <Grid className='main-container' item sm={ 12 }>
                        Note previews go here!
                    </Grid>
                </Grid>
            );
        else
            return (
                <Grid container alignContent='center' justify='center'
                    alignItems='center' direction='column' spacing={ 4 }>
                    <Grid className='navbar-container' item sm={ 12 }>
                        <NavBar validated={ this.state.validUser } />
                    </Grid>
                    <Grid className='login-container' item sm={ 12 }>
                        <Login />
                    </Grid>
                </Grid>
            );
    }
}

export default App;

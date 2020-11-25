import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component
{
    render()
    {
        if (this.props.validated)
            return (
                <AppBar position='static'>
                    <Toolbar className='navbar'>
                        <div className="nav-icon">
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <h1>Jot.</h1>
                    </Toolbar>
                </AppBar>
            );
        else
            return (
                <AppBar position='static'>
                    <Toolbar className='navbar'>
                        <div className="nav-icon">
                            <CreateIcon />
                        </div>
                        <Typography variant="h1">
                            Jot.
                            </Typography>
                    </Toolbar>
                </AppBar>
            );
    }

}

export default (NavBar);
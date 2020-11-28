import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class UserMenu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            passModalOpen: false,
        }
    }

    openChangePass = () =>
    {
        this.setState({
            passModalOpen: !this.state.passModalOpen,
        })
    }

    render()
    {
        return (
            <Grid container direction='column'>
                <Grid item>
                    <AppBar position='static'>
                        <Toolbar className='user-menu-navbar'>
                            <IconButton fontSize='large' edge='start' onClick={ () => this.props.openMenu() }>
                                <MenuIcon />
                            </IconButton>
                            <Typography className='nav-title' variant='h3'>
                                Jot.
                    </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item>
                    <List className='user-settings-menu'>
                        <ListItem>
                            <Typography variant='button'>
                                Hi, User!
                        </Typography>
                        </ListItem>
                        <ListItem button onClick={ this.openChangePass }>
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                        Change Password
                </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                        Logout
                </ListItem>
                    </List>
                </Grid>
            </Grid>
        );


    }

}

export default UserMenu;
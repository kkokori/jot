import React, { Component } from "react";

import ChangePass from './ChangePass';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Drawer from '@material-ui/core/Drawer';

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
        console.log("lol");
        this.setState({
            passModalOpen: !this.state.passModalOpen,
        })
    }

    closeAll = () =>
    {
        this.props.handleMenuOpen();
        this.setState({
            passModalOpen: false,
        });
    }

    render()
    {
        return (
            <Drawer className='user-menu-drawer' anchor='left' open={ this.props.openMenu } variant='temporary'
                ModalProps={ { onBackdropClick: this.closeAll, } }>
                <Grid container direction='column'>
                    <Grid item>
                        <AppBar position='static'>
                            <Toolbar className='user-menu-navbar'>
                                <IconButton fontSize='large' edge='start' onClick={ this.props.handleMenuOpen }>
                                    <MenuIcon />
                                </IconButton>
                                <Typography className='nav-title' variant='h3'>
                                    Jot.
                    </Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item>
                        <Modal className='change-pass-container' open={ this.state.passModalOpen }
                            disableAutoFocus hideBackdrop onBackdropClick={ this.openChangePass }>
                            <ChangePass />
                        </Modal>
                        <List className='user-settings-menu'>
                            <ListItem>
                                <Typography variant='button'>
                                    Hi, { this.props.username }!
                        </Typography>
                            </ListItem>
                            <ListItem button onClick={ this.openChangePass }>
                                <ListItemIcon>
                                    <LockIcon />
                                </ListItemIcon>
                                Change Password
                            </ListItem>
                            <ListItem button onClick={ this.props.handleLogout }>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                Logout
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Drawer >
        );


    }

}

export default UserMenu;
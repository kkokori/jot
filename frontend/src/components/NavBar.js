import React, { Component } from 'react';

import AddTags from './AddTags';
import FilterTags from './FilterTags';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component
{
    render()
    {
        const icon = this.props.validated ? <MenuIcon /> : <CreateIcon />
        const control = this.props.validated ?
            (
                <div className='nav-controls'>
                    <FilterTags filterTags={ this.props.filterTags } tags={ this.props.tags } note={ this.props.note } />
                    <AddTags editTag={ this.props.editTag } tags={ this.props.tags } note={ this.props.note }/>
                    <Button disableElevation size='large' variant='contained'
                        edge='end' endIcon={ <AddCircleIcon /> } onClick={ this.props.newNote }>
                        New Note
                    </Button>
                </div>
            ) : null;

        return (
            <AppBar position='static'>
                <Toolbar className='navbar'>
                    <IconButton fontSize='large' edge='start'>
                        { icon }
                    </IconButton>
                    <Typography className='nav-title' variant='h3'>
                        Jot.
                    </Typography>
                    { control }
                </Toolbar>
            </AppBar>
        );
    }

}

export default (NavBar);
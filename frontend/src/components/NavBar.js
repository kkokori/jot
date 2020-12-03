import React, { Component } from 'react';

import AddTags from './AddTags';
import FilterTags from './FilterTags';
import SortBy from './SortBy';

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
        const icon = this.props.validated ?
            (
                <IconButton fontSize='large' edge='start' onClick={ () => this.props.openMenu() }>
                    <MenuIcon />
                </IconButton>
            )
            :
            (
                <IconButton fontSize='large' edge='start' >
                    <CreateIcon />
                </IconButton>
            )
        
        const control = this.props.validated ?
            (
                <div className='nav-controls'>
                    <SortBy notes={ this.props.notes } sortNotes={ this.props.sortNotes } />
                    <FilterTags filterTags={ this.props.filterTags } tags={ this.props.tags } note={ this.props.note } />
                    <AddTags reloadNotes={ this.props.reloadNotes } updateNote={ this.props.updateNote } tags={ this.props.tags } note={ this.props.note } />
                    <Button disableElevation size='large' variant='contained' color='default'
                        edge='end' endIcon={ <AddCircleIcon /> } onClick={ this.props.openNewNoteModal }>
                        New Note
                    </Button>
                </div>
            ) : null;

        return (
            <AppBar position='static'>
                <Toolbar className='navbar'>
                        { icon }
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
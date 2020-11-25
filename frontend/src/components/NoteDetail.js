import React, { Component } from "react";

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';

class NoteDetail extends Component
{

    render()
    {
        if (this.props.note !== {})
            return (
                <Container disableGutters className='note-detail-container'>
                    <Toolbar className='note-detail-nav'>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <Typography variant="h6">
                            { this.props.note.title }
                        </Typography>
                    </Toolbar>
                    { this.props.note.content }
                </Container>
            );
        else
            return (
                <Typography>Select a note to view.</Typography>
            );


    }

}

export default NoteDetail;
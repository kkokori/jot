import React, { Component } from "react";

import NoteDetail from './NoteDetail';
import NoteThumb from './NoteThumb';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


class Home extends Component
{

    componentDidMount()
    {
        fetch('/api/notes/',
            {
                withCredentials: true,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Authorization': 'Token' + this.props.token,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(res => res.json())
            .then(
                (result) =>
                {
                    console.log(result.results)
                    this.props.handleLoadNotes(result.results);
                    //handleEmployeeLoadSuccess(result.results);
                },
                (error) =>
                {
                    console.log(error);  // error handling
                }
            );
    }


    render()
    {
        const noteList = (this.props.notes.length > 0 && this.props.notes[0]) ?
            this.props.notes.filter((n) =>
            {
                return n.visible
            }).map((n) => 
            {
                return <NoteThumb handleClickNote={ this.props.handleClickNote } key={ n.id } note={ n } />
            })
            : null;

        return (
            <Grid container item className='home-container' alignContent='center'
                justify='space-evenly' alignItems='center' direction='row' >
                <Grid className='notes-thumb-container' item sm={ 4 }>
                    <List className="notes-thumb-list">
                        { noteList }
                    </List>
                </Grid>
                <Divider orientation='vertical' />
                <Grid className='preview-container' item sm={ 7 }>
                    <NoteDetail deleteNote={ this.props.deleteNote } editNote={ this.props.editNote }
                        editTag={ this.props.editTag } editTitle={ this.props.editTitle } note={ this.props.selectedNote } />
                </Grid>
            </Grid>
        );
    }

}
export default (Home);
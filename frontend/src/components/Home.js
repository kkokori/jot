import React, { Component } from "react";

import NoteDetail from './NoteDetail';
import NoteThumb from './NoteThumb';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


class Home extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            selectedNote: {},
            notes: [
                {
                    id: 1,
                    title: "Note 1",
                    content: "random dshsahjkghj",
                    date: "11-23-2020",
                    tag: "School",
                    selected: false,
                },
                {
                    id: 2,
                    title: "Note 2",
                    content: "hsajkjkah dshsahjkghj",
                    date: "11-22-2020",
                    tag: "",
                    selected: false,
                },
                {
                    id: 3,
                    title: "Note 4",
                    content: "I need to work on the stupid database stuff omg lolol",
                    date: "11-20-2020",
                    tag: "School",
                    selected: false,
                },
                {
                    id: 4,
                    title: "Note 5",
                    content: "the mooooooooooooooooooooooooooooooooooodddd is weird because hgjskgdhakhakaahljkhagdlasbnhdksabhlbdfgkjabdhkl",
                    date: "11-20-2020",
                    tag: "Tea",
                    selected: false,
                },
                {
                    id: 5,
                    title: "Take Into Account All of the..fghjkhsfdgyuiaabfvghbjnkmb",
                    content: "ok dscfaghjks vgyisdhjlakl vghjelk 762189 veygbhjngbhnjm",
                    date: "11-20-2020",
                    tag: "Work",
                    selected: false,
                },
            ]
        };
    }

    handleClickNote = (note) =>
    {
        let notes = this.state.notes.map((n, i) =>
        {
            // turn off currently selected
            if (n.id !== note.id)
                n.selected = false;
            else if (n.id === note.id)
                n.selected = !n.selected;
            return n;
        });

        // clicked when already selected
        if (!note.selected) 
        {
            // deselect the note
            this.setState({
                notes: notes,
                selectedNote: {},
            });
        }
        // clicked when not selected
        else
        {
            // select the note
            this.setState({
                notes: notes,
                selectedNote: note,
            });
        }
    }

    render() 
    {
        return (
            <Grid container item className='home-container' alignContent='center'
                justify='space-evenly' alignItems='center' direction='row'>
                <Grid className='config-container' item sm={ 2 }>
                    Something! Tags/sorting, etc?
                </Grid>
                <Grid className='notes-thumb-container' item sm={ 4 }>
                    <List className="notes-thumb-list">
                        { this.state.notes.map((n) =>
                        {
                            return <NoteThumb handleClickNote={ this.handleClickNote } key={ n.id } note={ n } />
                        }) }
                    </List>
                </Grid>
                <Divider orientation='vertical' />
                <Grid className='preview-container' item sm={ 5 }>
                    <NoteDetail note={ this.state.selectedNote }/>
                </Grid>
            </Grid>
        );
    }

}
export default (Home);
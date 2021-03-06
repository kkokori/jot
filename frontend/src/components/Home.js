import React, { Component } from "react";

import NoteDetail from './NoteDetail';
import NoteThumb from './NoteThumb';
import NewNote from './NewNote';

import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            update: false,
            dispNotes: [],
            selectedDispNote: null,
        }
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (this.props.reload !== prevProps.reload)
            if (this.props.reload)
            {
                this.props.reloadNotes();
                this.fetchNotes();
            }
        if (prevProps.notes !== this.props.notes)
        {
            if (prevProps.notes.length === 0)
                this.initializeDisplayNotes();
            else
                this.updateDisplayNotes();
        }
        if (prevProps.note !== this.props.note)
            this.updateDisplayNote(this.props.note);
        if (prevProps.sort !== this.props.sort)
            this.sortNotes();
        if (prevProps.filters !== this.props.filters)
            this.filterTags();
    }

    componentDidMount()
    {
        // initialize the selected and visible arrays
        this.fetchNotes()
    }

    updateDisplayNote = (note) =>
    {

        this.setState({
            selectedDispNote: note,
        });
    }

    updateDisplayNotes = () =>
    {
        let srcIDs = this.props.notes.map(n => n.id);
        let dispIDs = this.state.dispNotes.map(n => n.id);
        let notes = [];
        if (dispIDs.length > srcIDs.length) // something was deleted 
            notes = this.state.dispNotes.filter(n =>
            {
                return srcIDs.includes(n.id); // only return ones in source
            });
        else if (dispIDs.length < srcIDs.length) // something was added
        {
            notes = this.state.dispNotes;
            this.props.notes.forEach(n =>
            {
                if (!dispIDs.includes(n.id))
                    notes.push(
                        {
                            ...n,
                            visible: true,
                            selected: false,
                        }
                    );
            });
        }
        else
            this.props.notes.forEach(n =>
            {
                let note = {
                    ...n,
                    visible: true,
                    selected: false
                }
                if (dispIDs.includes(n.id))
                {
                    let temp = this.state.dispNotes.find((el) => n.id === el.id);
                    note.visible = temp.visible;
                    note.selected = temp.selected;
                }
                    
                notes.push(note);
            });

        this.setState({
            dispNotes: notes,
        })
    }

    initializeDisplayNotes = () =>
    {
        let displayNotes = this.props.notes.map((n) =>
        {
            return {
                ...n,
                visible: true,
                selected: false,
            }
        });

        this.setState({
            dispNotes: displayNotes,
        });
    }

    fetchNotes = () =>
    {
        fetch('/api/notes/',
            {
                withCredentials: true,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Authorization': ('Token ' + this.props.user.token),
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(
                (result) =>
                {
                    this.props.handleLoadNotes(result);
                },
                (error) =>
                {
                    alert("Notes could not be loaded. Please refresh and try again.");
                }
            );
    }

    handleClickNote = (note) =>
    {
        if (this.props.note !== null && this.props.note.title === "")
        {
            alert("You must give this note a title!");
            return;
        }

        let selectedNote = null;
        let notes = this.state.dispNotes.map(n =>
        {
            // turn off currently selected
            if (n.selected)
                n.selected = false;
            else if (n.id === note.id)
            {
                selectedNote = n;
                n.selected = true;
            }
            return n;
        });

        this.props.handleSelectNote(selectedNote);
        this.setState({
            dispNotes: notes,
            selectedDispNote: selectedNote,
        });
    }

    sortNotes = () =>
    {
        let sort = this.props.sort;
        let notes = this.state.dispNotes;
        if (sort === "Date (oldest first)")
            notes.sort((m, n) =>
            {
                return m.date.diff(n.date);
            });
        else if (sort === "Date (most recent)")
            notes.sort((m, n) =>
            {
                return n.date.diff(m.date);
            });
        else if (sort === "Title (ascending)")
            notes.sort((m, n) =>
            {
                return m.title.toLowerCase().localeCompare(n.title.toLowerCase());
            });
        else if (sort === "Title (descending)")
            notes.sort((m, n) =>
            {
                return n.title.toLowerCase().localeCompare(m.title.toLowerCase());
            });

        this.setState({
            dispNotes: notes,
        });
    }

    filterTags = () =>
    {
        let tags = this.props.filters;
        let notes = [];
        // no selected tags to filter by (show all)
        if (tags.length === 0)
            notes = this.state.dispNotes.map(n =>
            {
                n.visible = true;
                return n;
            })
        else
            notes = this.state.dispNotes.map(n =>
            {
                // selected tags include notes's tag, make it visible
                if (tags.includes(n.tag))
                    n.visible = true;
                else if (tags.includes("Untagged") && n.tag == "")
                    n.visible = true;
                else
                    n.visible = false;
                return n;
            })

        this.setState({
            dispNotes: notes,
        });
    }


    render()
    {
        const noteList = (this.state.dispNotes.length > 0 && this.state.dispNotes[0]) ?
            this.state.dispNotes.filter((n) =>
            {
                return n.visible;
            }).map((n) => 
            {
                return <NoteThumb handleClickNote={ this.handleClickNote } key={ n.id } note={ n } />
            })
            : null;

        return (
            <Grid container item className='home-container' alignContent='center'
                justify='space-evenly' alignItems='center' direction='row' >
                <NewNote newNoteModalOpen={ this.props.newNoteModalOpen } openNewNoteModal={ this.props.openNewNoteModal } note={ this.props.note }
                    user={ this.props.user } tags={ this.props.tags } reloadNotes={ this.props.reloadNotes } handleClickNote={ this.handleClickNote } />
                <Grid className='notes-thumb-container' item sm={ 4 }>
                    <List disablePadding className="notes-thumb-list">
                        { noteList }
                    </List>
                </Grid>
                <Divider orientation='vertical' />
                <Grid className='preview-container' item sm={ 7 }>
                    <NoteDetail deleteNote={ this.props.deleteNote } updateDisplayNote={ this.updateDisplayNote }
                        reloadNotes={ this.props.reloadNotes } updateNote={ this.props.updateNote }
                        note={ this.state.selectedDispNote } user={ this.props.user } handleClickNote={ this.handleClickNote } />
                </Grid>
            </Grid>
        );
    }

}
export default (Home);
import React, { Component } from "react";
import Moment from 'moment';

import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';

import Grid from '@material-ui/core/Grid';

class App extends Component
{
    constructor(props)
    {
        // just make a date

        let date = Moment();
        super(props);
        this.state = {
            validUser: true,
            selectedNote: null,
            editing: false,
            currentID: 6,
            tags: ["Grocery", "Important", "Passwords", "To-Do"],
            notes: [
                {
                    visible: true,
                    id: 1,
                    title: "Note 1",
                    content: "random dshsahjkghj",
                    date: date,
                    tag: "Grocery",
                    selected: false,
                },
                {
                    visible: true,
                    id: 2,
                    title: "Note 2",
                    content: "hsajkjkah dshsahjkghj",
                    date: date,
                    tag: "",
                    selected: false,
                },
                {
                    visible: true,
                    id: 3,
                    title: "Note 4",
                    content: "I need to work on the stupid database stuff omg lolol",
                    date: date,
                    tag: "To-Do",
                    selected: false,
                },
                {
                    visible: true,
                    id: 4,
                    title: "Note 5",
                    content: "the mooooooooooooooooooooooooooooooooooodddd is weird because hgjskgdhakhakaahljkhagdlasbnhdksabhlbdfgkjabdhkl",
                    date: date,
                    tag: "Important",
                    selected: false,
                },
                {
                    visible: true,
                    id: 5,
                    title: "Take Into Account All of the..fghjkhsfdgyuiaabfvghbjnkmb",
                    content: "ok dscfaghjks vgyisdhjlakl vghjelk 762189 veygbhjngbhnjm",
                    date: date,
                    tag: "Passwords",
                    selected: false,
                },
            ]
        };
    }

    handleClickNote = (note) =>
    {
        let notes = this.state.notes.map(n =>
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
                selectedNote: null,
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

    newNote = () =>
    {
        let notes = this.state.notes.map(n =>
        {
            n.selected = false;
            return n;
        });
        let id = this.state.currentID;
        let newNote =
        {
            id: id,
            title: "Untitled",
            content: "",
            date: Moment(),
            tag: "",
            selected: true,
        };
        notes.push(newNote);

        this.setState({
            selectedNote: newNote,
            currentID: id + 1,
            notes: notes,
        });
    }

    editTitle = (title, note) =>
    {
        let notes = this.state.notes.map(n =>
        {
            if (n.id === note.id)
                n.title = title;
            return n;
        });

        this.setState({
            notes: notes,
        });
    }

    editNote = (content, note) =>
    {
        let notes = this.state.notes.map(n =>
        {
            if (n.id === note.id)
                n.content = content;
            return n;
        });

        this.setState({
            notes: notes,
        });
    };

    deleteNote = (note) =>
    {
        let notes = this.state.notes.filter(n =>
        {
            return n.id !== note.id;
        });

        this.setState({
            notes: notes,
            selectedNote: null,
        });
    }

    editTag = (tag, note) =>
    {
        let notes = this.state.notes.map(n =>
        {
            if (n.id === note.id)
                n.tag = tag;
            return n;
        });

        this.setState({
            notes: notes,
        });
    }

    filterTags = (tags) =>
    {
        let notes = [];
        // no selected tags to filter by (show all)
        if (tags.length === 0)
            notes = this.state.notes.map(n =>
            {
                n.visible = true;
                return n;
            })
        else
            notes = this.state.notes.map(n =>
            {
                // selected tags include notes's tag, make it visible
                if (tags.includes(n.tag))
                    n.visible = true;
                else
                    n.visible = false;
                return n;
            })
        
        this.setState({
            notes: notes,
        });
    }

    render()
    {
        const content = this.state.validUser ?
            <Home handleClickNote={ this.handleClickNote } deleteNote={ this.deleteNote } editTitle={ this.editTitle }
                editNote={ this.editNote } editTag={ this.editTag } notes={ this.state.notes } selectedNote={ this.state.selectedNote } />
            : <Login />

        return (
            <Grid container className='app-container' justify='center' alignItems='center'>
                <Grid className='navbar-container' item sm={ 12 }>
                    <NavBar tags={ this.state.tags } note={ this.state.selectedNote } validated={ this.state.validUser }
                        newNote={ this.newNote } editTag={ this.editTag } filterTags={ this.filterTags } />
                </Grid>
                { content }
            </Grid>
        );
    }
}

/*
   else
    return(
                <Grid container className = 'app-container' alignContent = 'center'
                    justify = 'center' alignItems = 'center' direction = 'column' >
                    <Grid className='navbar-container' item sm={ 12 }>
                        <NavBar disableGutters validated={ this.state.validUser } />
                    </Grid>
                    <Grid className='login-container' item sm={ 12 }>
                        <Login />
                    </Grid>
                </Grid>
            );
            */

export default App;

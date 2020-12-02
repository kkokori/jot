import React, { Component } from "react";
import Moment from 'moment';

import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';
import UserMenu from './UserMenu';

import Grid from '@material-ui/core/Grid';

class App extends Component
{
    constructor(props)
    {
        // just make a date

        let date = Moment();
        super(props);
        this.state = {
            user: {
                token: "",
                email: "",
                id: "",
                username: "",
            },
            validUser: false,
            selectedNote: null,
            editing: false,
            openMenu: false,
            tags: ["Untagged", "Grocery", "Important", "Passwords", "To-Do"],
            notes: [],
            newNoteModalOpen: false,
        };
    }

    resetState = () =>
    {
        this.setState({
            user: {
                token: "",
                email: "",
                id: "",
                username: "",
            },
            validUser: false,
            selectedNote: null,
            editing: false,
            openMenu: false,
            notes: [],
            newNoteModalOpen: false,
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevState.validUser !== this.state.validUser)
            if (!this.state.validUser) // logged out
                this.resetState(); 
    }

    handleLogin = (data) =>
    {
        this.setState({
            validUser: true,
            user: {
                id: data.user_id,
                token: data.token,
                username: data.username,
                email: data.email,
            }
        });
    }

    handleLogout = () =>
    {
        this.resetState();
    }

    handleLoadNotes = (notes) =>
    {
        let noteList = [];
        notes.forEach(n =>
        {
            let note =
            {
                id: n.id,
                date: Moment(n.date_created),
                title: n.title,
                content: n.content,
                tag: n.tag,
                visible: true,
            }
            noteList.push(note);
        });

        this.setState({
            notes: noteList,
        });
    }

    handleClickNote = (note) =>
    {
        if (this.state.selectedNote !== null && this.state.selectedNote.title === "")
        {
            alert("You must give this note a title!");
            return;
        }

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

    openNewNoteModal = () =>
    {
        this.setState({
            newNoteModalOpen: !this.state.newNoteModalOpen,
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
            {
                if (tag !== "Untagged")
                    n.tag = tag;
            }
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
                else if (tags.includes("Untagged") && n.tag == "")
                    n.visible = true;
                else
                    n.visible = false;
                return n;
            })

        this.setState({
            notes: notes,
        });
    }

    sortNotes = (sort) =>
    {
        let notes = this.state.notes;
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
            notes: notes,
        });
    }

    handleMenuOpen = () =>
    {
        this.setState({
            openMenu: !this.state.openMenu,
        });
    }

    render()
    {
        const content = this.state.validUser ?
            <Home handleLoadNotes={ this.handleLoadNotes } handleClickNote={ this.handleClickNote } deleteNote={ this.deleteNote }
                editTitle={ this.editTitle } editNote={ this.editNote } editTag={ this.editTag } notes={ this.state.notes } tags={ this.state.tags }
                selectedNote={ this.state.selectedNote } user={ this.state.user } newNoteModalOpen={ this.state.newNoteModalOpen } openNewNoteModal={ this.openNewNoteModal } />
            : <Login handleLogin={ this.handleLogin } />;

        return (
            <Grid container className='app-container' justify='center' alignItems='center'>
                <Grid className='navbar-container' item sm={ 12 }>
                    <UserMenu openMenu={ this.state.openMenu } user={ this.state.user }
                        handleMenuOpen={ this.handleMenuOpen } handleLogout={ this.handleLogout } />
                    <NavBar validated={ this.state.validUser } notes={ this.props.notes } note={ this.state.selectedNote }
                        tags={ this.state.tags } openNewNoteModal={ this.openNewNoteModal } editTag={ this.editTag }
                        sortNotes={ this.sortNotes } filterTags={ this.filterTags } openMenu={ this.handleMenuOpen } />
                </Grid>
                { content }
            </Grid>
        );
    }
}

export default App;

/*{
                    visible: true,
                    id: 1,
                    title: "Okay bb",
                    content: "random dshsahjkghj",
                    date: date,
                    tag: "Grocery",
                    selected: false,
                },
                {
                    visible: true,
                    id: 2,
                    title: "I wanna die",
                    content: "hsajkjkah dshsahjkghj",
                    date: date,
                    tag: "",
                    selected: false,
                },
                {
                    visible: true,
                    id: 3,
                    title: "Note",
                    content: "I need to work on the stupid database stuff omg lolol",
                    date: date,
                    tag: "To-Do",
                    selected: false,
                },
                {
                    visible: true,
                    id: 4,
                    title: "hello",
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
            ]*/
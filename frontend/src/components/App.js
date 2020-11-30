import React, { Component } from "react";
import Moment from 'moment';

import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';
import UserMenu from './UserMenu';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';

/*
The SessionAuthentication class allows session cookies to provide the user authentication. You'll want to provide a standard HTML login flow, to allow the user to login, and then instantiate a client using session authentication:

let auth = new coreapi.auth.SessionAuthentication({
    csrfCookieName: 'csrftoken',
    csrfHeaderName: 'X-CSRFToken',
});
let client = new coreapi.Client({auth: auth});
*/

const coreapi = require('coreapi')
var client = new coreapi.Client();

class App extends Component
{
    constructor(props)
    {
        // just make a date

        let date = Moment();
        super(props);
        this.state = {
            token: "",
            validUser: false,
            selectedNote: null,
            editing: false,
            currentID: 6,
            openMenu: false,
            tags: ["Grocery", "Important", "Passwords", "To-Do"],
            notes: [
                {
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
            ]
        };
    }

    handleLogin = (token, username) =>
    {
        this.setState({
            token: token,
            validUser: true,
            username: username,
        });
    }

    handleLogout = () =>
    {
        this.setState({
            token: "",
            validUser: false,
            username: "",
            openMenu: false,
        });
    }

    handleLoadNotes = (notes) =>
    {
        this.setState({
            notes: notes,
        })
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

    newNote = () =>
    {
        if (this.state.selectedNote !== null && this.state.selectedNote.title === "")
        {
            alert("You must give this note a title!");
            return;
        }

        let notes = this.state.notes.map(n =>
        {
            n.selected = false;
            return n;
        });
        let id = this.state.currentID;
        let newNote =
        {
            visible: true,
            id: id,
            title: "",
            content: "",
            date: Moment(),
            tag: "",
            selected: true,
        };
        notes.push(newNote);

        // Here we've changed the action from "list" to "create", and additionally
        // pass in the data we want to use. The rest is the same as above.
        client.action(window.schema, ['api/notes', 'create'], newNote).then((result) =>
        {
            console.log(result);
        }).catch((error) =>
        {
            alert.log(error);
        });


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

    sortNotes = (sort) =>
    {
        let notes = this.state.notes;
        console.log(sort);
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
                console.log(n.title.toLowerCase().localeCompare(m.title.toLowerCase()));
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
            <Home handleLoadNotes={ this.handleLoadNotes } handleClickNote={ this.handleClickNote } deleteNote={ this.deleteNote } editTitle={ this.editTitle }
                editNote={ this.editNote } editTag={ this.editTag } notes={ this.state.notes } selectedNote={ this.state.selectedNote } token={ this.props.token } />
            : <Login handleLogin={ this.handleLogin } />;

        return (
            <Grid container className='app-container' justify='center' alignItems='center'>
                <Grid className='navbar-container' item sm={ 12 }>
                    <UserMenu openMenu={ this.state.openMenu } username={ this.state.username }
                        handleMenuOpen={ this.handleMenuOpen } handleLogout={ this.handleLogout } />
                    <NavBar validated={ this.state.validUser } notes={ this.props.notes } note={ this.state.selectedNote }
                        tags={ this.state.tags } newNote={ this.newNote } editTag={ this.editTag } filterTags={ this.filterTags }
                        sortNotes={ this.sortNotes } openMenu={ this.handleMenuOpen } />
                </Grid>
                { content }
            </Grid>
        );
    }
}

export default App;

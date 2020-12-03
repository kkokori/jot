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
        super(props);
        this.state = {
            user: {
                token: "",
                email: "",
                id: "",
                username: "",
            },
            selectedSort: "Date (oldest first)",
            selectedFilters: [],
            validUser: false,
            selectedNote: null,
            editing: false,
            openMenu: false,
            tags: ["Untagged", "Grocery", "Important", "Passwords", "To-Do"],
            notes: [],
            newNoteModalOpen: false,
            reload: false,
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
            status: {
                visible: [],
                selected: [],
            },
            newNoteModalOpen: false,
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevState.validUser !== this.state.validUser)
            if (!this.state.validUser) // logged out
                this.resetState();
    }

    reloadNotes = () =>
    {
        this.setState({
            reload: !this.state.reload,
        });
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
        let select = null;
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
            }
            noteList.push(note);
            if (this.state.selectedNote !== null)
                if (this.state.selectedNote.id === n.id)
                {
                    select = note;
                }
        });

        this.setState({
            notes: noteList,
            selectedNote: select,
        });
    }

    handleSelectNote = (note) =>
    {
        console.log(note);
        console.log(this.state.notes);

        let selected = (note === null) ? null : this.state.notes.filter(n =>
        {
            return note.id === n.id;
        })[0];

        this.setState({
            selectedNote: selected,
        });
    }

    openNewNoteModal = () =>
    {
        this.setState({
            newNoteModalOpen: !this.state.newNoteModalOpen,
        });
    }

    updateNote = (data, note) =>
    {
        const url = "api/update-note/" + note.id + "/";

        fetch(url,
            {
                withCredentials: true,
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Authorization': ('Token ' + this.state.user.token),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response =>
            {
                if (response.status >= 400)
                {
                    alert("We could not update the note. Please try again.");
                    return false;
                }
                else
                {
                    this.reloadNotes();
                }
            })
    }

    handleMenuOpen = () =>
    {
        this.setState({
            openMenu: !this.state.openMenu,
        });
    }

    handleSort = (sort) =>
    {
        this.setState({
            selectedSort: sort,
        })
    }

    handleFilter = (filters) =>
    {
        this.setState({
            selectedFilters: filters,
        });
    }


    render()
    {
        const content = this.state.validUser ?
            <Home user={ this.state.user } tags={ this.state.tags } notes={ this.state.notes } note={ this.state.selectedNote }
                sort={ this.state.selectedSort } filters={ this.state.selectedFilters } reload={ this.state.reload }
                newNoteModalOpen={ this.state.newNoteModalOpen } openNewNoteModal={ this.openNewNoteModal }
                initializeStatus={ this.initializeStatus } updateNote={ this.updateNote } reloadNotes={ this.reloadNotes }
                handleLoadNotes={ this.handleLoadNotes } handleSelectNote={ this.handleSelectNote } />
            :
            <Login handleLogin={ this.handleLogin } />;

        return (
            <Grid container className='app-container' justify='center' alignItems='center'>
                <Grid className='navbar-container' item sm={ 12 }>
                    <UserMenu openMenu={ this.state.openMenu } user={ this.state.user }
                        handleMenuOpen={ this.handleMenuOpen } handleLogout={ this.handleLogout } />
                    <NavBar validated={ this.state.validUser } tags={ this.state.tags } notes={ this.state.notes } note={ this.state.selectedNote }
                        openNewNoteModal={ this.openNewNoteModal } updateNote={ this.updateNote }
                        handleSort={ this.handleSort } handleFilter={ this.handleFilter } reloadNotes={ this.reloadNotes } openMenu={ this.handleMenuOpen } />
                </Grid>
                { content }
            </Grid>
        );
    }
}

export default App;

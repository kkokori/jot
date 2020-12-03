import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class NewNote extends Component
{
    constructor(props) 
    {
        super(props);
        this.state =
        {
            id: this.props.user.id,
            token: this.props.user.token,
            email: this.props.user.email,
            username: this.props.user.username,
            title: "",
            content: "",
            tag: "",
            error: false,
            errorMessage: "",
        }
    }

    setTag = (tag) =>
    {
        let val = (tag === "Untagged") ? "" : tag;
        this.setState({
            tag: val,
        });
    }

    handleTitleChange = (title) =>
    {
        this.setState({
            error: false,
            errorMessage: "",
            title: title,
        });
    }

    handleContentChange = (content) =>
    {
        this.setState({
            content: content,
        });
    }

    handleNewNoteSubmit = () =>
    {
        if (this.state.title === "")
        {
            this.setState({
                error: true,
                errorMessage: (< Typography variant="caption" color="error" >
                    Title must not be empty. Please enter a title for this note.
                </Typography >),
            });
            return;
        }

        let cont = this.state.content === "" ? " " : this.state.content;
        const data = {
            title: this.state.title,
            content: cont,
            tag: this.state.tag,
        }

        fetch("api/new-note/",
            {
                withCredentials: true,
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Authorization': ('Token ' + this.state.token),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response =>
            {
                if (response.status >= 400)
                {
                    this.setState({
                        errorMessage:
                            <Typography variant="caption" color="error" >
                                Something went wrong. We could not create the note. Please try again.
                            </Typography>,
                        error: true,
                    });
                    return false;
                }
                else
                    return response.json();
            })
            .then(data =>
            {
                if (data)
                {
                    this.props.reloadNotes();
                    this.setState({
                        title: "",
                        content: "",
                        tag: "",
                        error: false,
                        errorMessage: "",
                    });
                    this.props.openNewNoteModal();
                    this.props.handleClickNote(this.props.note);
                }
            });
    }
    //className='new-note-container'
    render()
    {
        const tag = this.state.tag === "Untagged" ? '' : this.state.tag;

        return (
            <Dialog disableAutoFocus hideBackdrop fullWidth
                open={ this.props.newNoteModalOpen } onBackdropClick={ this.props.openNewNoteModal }>
                <DialogTitle>
                    <div className="new-note-headers">
                        <Typography className="new-note-header" variant="h5" display="block" align="left">New Note</Typography>
                        <div className='tag-select-container'>
                            <FormControl variant='filled'>
                                <InputLabel id='tag-select-label'>Add Tag</InputLabel>
                                <Select className='new-note-tag-select' labelId='tag-select-label' id='tag-select' label='Add Tag'
                                    value={ tag } onChange={ (e) => this.setTag(e.target.value) }>
                                    { this.props.tags.map(t =>
                                    {
                                        return <MenuItem key={ t } value={ t }>{ t }</MenuItem>;
                                    }) }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    { this.state.errorMessage }
                    <TextField required className="note-title-input" placeholder="Title" type="text" error={ this.state.error }
                        variant="outlined" value={ this.state.title } onChange={ (e) => this.handleTitleChange(e.target.value) } />
                    <br /><br />
                    <TextField className="note-content-input" multiline variant="outlined" placeholder="Note Content" type="text" rows={ 8 }
                        rowsMax={ 8 } value={ this.state.content } onChange={ (e) => this.handleContentChange(e.target.value) } />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ this.props.openNewNoteModal } size="small">Cancel</Button>
                    <Button variant="contained" size="medium" onClick={ this.handleNewNoteSubmit }>
                        Create Note
                        </Button>
                </DialogActions>


            </Dialog>
        );
    }

}

export default NewNote;
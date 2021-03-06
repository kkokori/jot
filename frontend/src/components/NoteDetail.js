import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

class NoteDetail extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            openConfirm: false,
            id: this.props.user.id,
            token: this.props.user.token,
            email: this.props.user.email,
            username: this.props.user.username,
            noteSelected: false,
            editTitle: false,
            noteid: "",
            tag: "",
        }
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.note !== this.props.note)
        {
            let noteid = "";
            let tag = "";
            if (this.props.note !== null)
            {
                noteid = this.props.note.id;
                tag = this.props.note.tag;
            }

            this.setState({
                noteSelected: this.props.note !== null,
                editTitle: false,
                noteid: noteid,
                tag: tag,
            });
        }
    }



    saveTitle = (e) =>
    {
        if (e.code === "Enter" || e.type === "click")
        {
            let title = e.target.value;
            const data = { title: title };

            this.props.updateNote(data, this.props.note);
            this.setState({
                editTitle: false,
            });
        }
    }


    handleOpenConfirm = () =>
    {
        this.setState({
            openConfirm: !this.state.openConfirm
        })
    }

    handleDeleteNote = () => 
    {
        this.handleOpenConfirm();
        const url = "api/delete-note/" + this.state.noteid + "/";
        fetch(url,
            {
                withCredentials: true,
                credentials: 'include',
                method: 'DELETE',
                headers:
                {
                    'Authorization': ('Token ' + this.state.token),
                }
            })
            .then(response =>
            {
                if (response.status >= 400)
                {
                    alert("We could not delete the note. Please try again.");
                    return false;
                }
                else
                {
                    this.props.reloadNotes();
                    this.props.handleClickNote(this.props.note);
                    this.setState({
                        noteSelected: false,
                        noteid: "",
                        tag: "",
                    });
                }
            })
    }

    handleTagSelect = (tag) => 
    {
        let val = (tag === "Untagged") ? "" : tag;
        const data = {
            tag: val,
        }

        let note = this.props.note;
        note.tag = val;

        this.props.updateDisplayNote(note);
        this.props.updateNote(data, this.props.note);
    }

    handleTitleChange = (title) =>
    {
        if (title === "")
            return;

        const data = {
            title: title,
        }

        let note = this.props.note;
        note.title = title;

        this.props.updateDisplayNote(note);
        this.props.updateNote(data, this.props.note);
    }

    handleContentChange = (content) =>
    {
        const data = {
            content: content,
        }

        let note = this.props.note;
        note.content = content;

        this.props.updateDisplayNote(note);
        this.props.updateNote(data, this.props.note)
    }

    render()
    {
        let content = <Typography variant="h6">Select a note to view.</Typography>;
        let title = "";
        let subheader = "";
        let tag = ""

        if (this.props.note !== null)
        {
            content = <TextField className="note-content" multiline variant="outlined" rows={ 26 } rowsMax={ 26 }
                value={ this.props.note.content } onChange={ (e) => this.handleContentChange(e.target.value) } />

            title = (this.state.editTitle || this.props.note.title == "") ?
                <div>
                    <TextField required className="note-title" id={ "note-" + this.props.id + "-title" } value={ this.props.note.title }
                        onChange={ (e) => this.handleTitleChange(e.target.value) } onKeyDown={ (e) => this.saveTitle(e) } />
                    <IconButton edge="end" size="small" disabled={ !this.state.noteSelected }
                        onClick={ (e) => this.saveTitle(e) }>
                        <SaveIcon />
                    </IconButton>
                </div>
                : this.props.note.title;

            subheader = this.props.note.date.format("MM-DD-YYYY hh:mmA");
            tag = (this.props.note.tag !== "") ?
                <Chip label={ this.props.note.tag } size='medium' variant='outlined' onDelete={ () => this.handleTagSelect("Untagged") } /> : null;
        }

        return (
            <Card className='note-detail-container'>
                <Dialog disableBackdropClick disableEscapeKeyDown open={ this.state.openConfirm }>
                    <DialogTitle id="confirmation-dialog-title">Are you sure you want to delete this note?</DialogTitle>
                    <DialogActions>
                        <Button autoFocus onClick={ this.handleOpenConfirm } color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={ this.handleDeleteNote } color="primary">
                            Confirm
                     </Button>
                    </DialogActions>
                </Dialog>
                <CardHeader onDoubleClick={ () => this.setState({ editTitle: true }) } className='note-detail-nav' title={ title }
                    titleTypographyProps={ { variant: "h6" } } subheader={ subheader } subheaderTypographyProps={ { variant: "caption" } }
                    action={
                        <div>
                            { tag }
                            <IconButton edge="end" size="medium" disabled={ !this.state.noteSelected }
                                onClick={ this.handleOpenConfirm }>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    } />
                <CardContent>
                    { content }
                </CardContent>
            </Card>
        );

    }

}

export default NoteDetail;
import React, { Component } from "react";
import Moment from 'moment';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class NoteDetail extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            noteSelected: false,
            editTitle: false,
        }
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.note !== this.props.note)
            this.setState({
                noteSelected: this.props.note !== null,
                editTitle: false,
            });
    }

    saveTitle = (e) =>
    {
        if (e.code === "Enter")
            this.setState({
                editTitle: false,
            });
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
                value={ this.props.note.content } onChange={ (e) => this.props.editNote(e.target.value, this.props.note) } />

            title = this.state.editTitle ?
                <TextField className="note-title" id={ "note-" + this.props.id + "-title" } value={ this.props.note.title }
                    onChange={ (e) => this.props.editTitle(e.target.value, this.props.note) } onKeyDown={ (e) => this.saveTitle(e) } />
                : this.props.note.title;

            //subheader = "date";
            subheader = this.props.note.date.format("MM-DD-YYYY hh:mmA");
            tag = (this.props.note.tag !== "") ?
                <Chip label={ this.props.note.tag } size='medium' variant='outlined' onDelete={ () => this.props.editTag("", this.props.note) }/> : null;
        }

        return (
            <Card className='note-detail-container'>
                <CardHeader onClick={ () => this.setState({ editTitle: true }) } className='note-detail-nav' title={ title }
                    titleTypographyProps={ { variant: "h6" } } subheader={ subheader } subheaderTypographyProps={ { variant: "caption" } }
                    action={
                        <div>
                            { tag }
                            <IconButton edge="end" disabled={ !this.state.noteSelected }
                                onClick={ () => this.props.deleteNote(this.props.note) }>
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
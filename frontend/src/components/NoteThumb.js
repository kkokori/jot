import React, { Component } from "react";

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

class NoteThumb extends Component
{

    render()
    {
        let title = this.props.note.title.substring(0, 40);
        let snippet = this.props.note.content.substring(0, 45);
        if (this.props.note.content.length > 45)
            snippet += "...";
        if (this.props.note.title.length > 40)
            title += "..."

        
        return (
            <ListItem selected={ this.props.note.selected } disableGutters className="note-thumb-container">
                <Card className="note-thumb">
                    <CardActionArea onClick={ () => this.props.handleClickNote(this.props.note) } className="note-thumb">
                        <div className="note-thumb-title">
                            <CardHeader title={ title } titleTypographyProps={ { variant: "h6" } } subheader={ this.props.note.date } subheaderTypographyProps={ { variant: "caption" } } />
                        </div>
                        <CardContent className="note-thumb-content">
                            <Typography className="note-thumb-snippet">
                                { snippet }
                            </Typography>
                        </CardContent>
                        <Typography className="note-thumb-tag" variant="overline">
                            { this.props.note.tag }
                        </Typography>
                    </CardActionArea>
                </Card>
            </ListItem>
        );


    }

}

export default NoteThumb;
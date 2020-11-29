import React, { Component } from "react";

import NoteThumb from './NoteThumb';

import List from '@material-ui/core/List';

class Notes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            notes: [
                {
                    id: 1,
                    title: "Note 1",
                    content: "random dshsahjkghj",
                    date: "11-23-2020",
                    tag: "School",
                },
                {
                    id: 2,
                    title: "Note 2",
                    content: "hsajkjkah dshsahjkghj",
                    date: "11-22-2020",
                    tag: "",
                },
                {
                    id: 3,
                    title: "Note 4",
                    content: "I need to work on the stupid database stuff omg lolol",
                    date: "11-20-2020",
                    tag: "School",
                },
                {
                    id: 4,
                    title: "Note 5",
                    content: "the mooooooooooooooooooooooooooooooooooodddd is weird because hgjskgdhakhakaahljkhagdlasbnhdksabhlbdfgkjabdhkl",
                    date: "11-20-2020",
                    tag: "Tea",
                },
                {
                    id: 5,
                    title: "Take Into Account All of the..fghjkhsfdgyuiaabfvghbjnkmb",
                    content: "ok dscfaghjks vgyisdhjlakl vghjelk 762189 veygbhjngbhnjm",
                    date: "11-20-2020",
                    tag: "Work",
                },
            ]
        };
    }
    
    // read in all the notes here from the user associated with it!

    render()
    {
        return (
            <List className="notes-thumb-list">
                {this.state.notes.map((n) =>
                {
                    return <NoteThumb key={ n.id } note={ n } />
                }) }
            </List>
        );


    }
}

export default Notes;
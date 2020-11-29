import React, { Component } from "react";

class NoteList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading..."
        };
    }

    componentDidMount()
    {
        fetch("api/note")
            .then(response =>
            {
                if (response.status > 400)
                {
                    return this.setState(() =>
                    {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data =>
            {
                this.setState(() =>
                {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render()
    {
        return (
            <ul>
                {this.state.data.map(note =>
                {
                    return (
                        <li key={ note.id }>
                            {note.title } - {note.content }
                        </li>
                    );
                }) }
            </ul>
        );
    }
}

export default NoteList;

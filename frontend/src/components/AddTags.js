import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class AddTags extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            disabledTags: true,
            selectedTags: [],
        }
    }

    componentDidUpdate(prevProps) 
    {
        if (prevProps.note !== this.props.note)
            this.setState({
                disabledTags: (this.props.note === null),
            });
    }

    render()
    {
        const tag = this.props.note !== null ? this.props.note.tag : ''
        return (
            <FormControl variant='filled' disabled={ this.state.disabledTags } >
                <InputLabel id='tag-select-label'>Change Tag</InputLabel>
                <Select className='tag-select' labelId='tag-select-label' id='tag-select' autoWidth value={ tag }
                    label='Change Tag' onChange={ (e) => this.props.editTag(e.target.value, this.props.note) }>
                    { this.props.tags.map(t =>
                    {
                        return <MenuItem key={ t } value={ t }>{ t }</MenuItem>
                    }) }
                </Select>
            </FormControl>
        );
    }
}

export default AddTags;
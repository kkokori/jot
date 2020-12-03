import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class SortBy extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedSort: "Date (oldest first)",
            sorts: ["Date (oldest first)", "Date (most recent)", "Title (ascending)", "Title (descending)"],
        }
    }

    handleSelectSort = (sort) =>
    {
        this.props.handleSort(sort);
        this.setState({
            selectedSort: sort,
        })
    }

    render()
    {
        return (
            <FormControl variant='filled' >
                <InputLabel id='sort-label'>Sort by</InputLabel>
                <Select className='sort' labelId='sort-label' id='sort' autoWidth value={ this.state.selectedSort }
                    label='Sort by' onChange={ (e) => this.handleSelectSort(e.target.value) }>
                    { this.state.sorts.map(t =>
                    {
                        return <MenuItem key={ t } value={ t }>{ t }</MenuItem>
                    }) }
                </Select>
            </FormControl>
        );
    }
}

export default SortBy;
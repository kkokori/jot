import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class FilterTags extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedTags: [],
        }
    }

    handleSelectTag = (tag) =>
    {
        let included = false;
        let tags = this.state.selectedTags.filter(t =>
        {
            if (t === tag)
                included = true;
            return t !== tag;
        });

        if (!included)
            tags.push(tag);
        
        if (tag == "")
            tags.push("Untagged");
        
        this.setState({
            selectedTags: tags,
        });

        this.props.filterTags(tags);
    }
    render()
    {
        return (
            <FormControl variant='filled' multiple>
                <InputLabel id='tag-filter-label'>Filter by Tag</InputLabel>
                <Select className='tag-filter' labelId='tag-filter-label' id='tag-filter' autoWidth value={ this.state.selectedTags }
                    label='Filter by Tag' renderValue={ (selected) => { return selected.join(", "); } }
                    onChange={ (e) => this.handleSelectTag(e.target.value) }>
                    { this.props.tags.map(t =>
                    {
                        return (
                            <MenuItem key={ t } value={ t }>
                                <Checkbox checked={ this.state.selectedTags.includes(t) } />
                                <ListItemText primary={ t } />
                            </MenuItem>
                        );
                    }) }
                </Select>
            </FormControl>
        );
    }
}

export default FilterTags;
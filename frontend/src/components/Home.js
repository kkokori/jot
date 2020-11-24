import React, { Component } from "react";

import Notes from './Notes';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

class Home extends Component
{
    render() 
    {
        return (
            <Grid container item className='home-container' alignContent='center'
                justify='center' alignItems='center' direction='row'>
                <Grid className='config-container' item sm={ 2 }>
                    Something! Tags/sorting, etc?
                </Grid>
                <Grid className='notes-thumb-container' item sm={ 4 }>
                    <Notes />
                </Grid>
                <Divider orientation='vertical'/>
                <Grid className='preview-container' item sm={ 5 }>
                    Note previews go here!
                </Grid>
            </Grid>
        );
    }

}
export default (Home);
import React, { Component } from 'react';

import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ChangePass extends Component
{

    render()
    {
        return (
            <form onSubmit={ () => { console.log("submitted") } } className="change-pass-form">
                <h2>Change password</h2>
                <div className="change-pass-fields">
                    <TextField required id="current-pass-input" placeholder="Current Password" type="password" />
                    <br /><br />
                    <TextField required id="new-pass-input" placeholder="New Password" type="password" />
                    <br /><br />
                    <div className="change-pass-button-container">
                        <Button className="change-pass-button" variant="contained" size="medium" type="submit">Change Password</Button>
                    </div>
                </div>
            </form>
        );
    }

}

export default ChangePass;
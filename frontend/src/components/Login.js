import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Login extends Component
{
    render()
    {
        return (
            <div>
                <h2>Login to Jot.</h2>
                <FormControl className="login-form" autoComplete="off">
                    <Input required id="email-input" placeholder="Email" type="email" />
                    <Input required id="password-input" placeholder="Password" type="password" />
                    <Button color="primary" variant="contained">Login</Button>
                    Don't have an account? Register.
                </FormControl>
            </div>
        );
    }

}

export default (Login);
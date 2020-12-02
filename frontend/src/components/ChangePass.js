import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ChangePass extends Component
{
    constructor(props) 
    {
        super(props);
        this.state =
        {
            id: this.props.user.id,
            token: this.props.user.token,
            email: this.props.user.email,
            username: this.props.user.username,
            errorMessage: "",
            oldPass: "",
            error: false,
            password1: "",
            password2: "",
            match: true,
        }
    }

    handleOldPassChange = (pass) =>
    {
        this.setState({
            oldPass: pass,
        });
    }

    handlePass1Change = (pass1) =>
    {
        this.setState({
            password1: pass1,
        });
    }

    handlePass2Change = (pass2) =>
    {
        let match = false;
        let passMatchText = "Your passwords do not match.";
        if (pass2 === this.state.password1)
        {
            passMatchText = "",
                match = true;
        }

        this.setState({
            passMatchText: passMatchText,
            match: match,
            password2: pass2,
        });
    }

    handleSubmitPassChange = () =>
    {
        const data = {
            // username: this.state.username,
            //email: this.state.email,
            old_password: this.state.oldPass,
            new_password: this.state.password1,
            new_password2: this.state.password2,
        }

        fetch("api/change-password/",
            {
                withCredentials: true,
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Authorization': ('Token ' + this.state.token),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response =>
            {
                console.log(response.status >= 400);
                if (response.status >= 400)
                {
                    this.setState({
                        errorMessage:
                            (< Typography variant="caption" color="error" className="error-message" >
                                You may have entered an incorrect password. Please try again.
                            </Typography >),
                        error: true,
                    });
                    return false;
                }
                else
                    return response.json();
            })
            .then(data =>
            {
                if (data)
                {
                    this.props.closeModal();
                    alert("Your password has been changed.");
                }

            });

    }

    render()
    {
        return (
            <form className="change-pass-form">
                <h2>Change password</h2>
                { this.state.errorMessage }
                <div className="change-pass-fields">
                    <TextField required id="current-pass-input" placeholder="Current Password" type="password" error={ this.state.error }
                        value={ this.state.oldPass } onChange={ (e) => this.handleOldPassChange(e.target.value) } />
                    <br /><br />
                    <TextField required id="new-pass-input" placeholder="New Password" type="password"
                        value={ this.state.password1 } onChange={ (e) => this.handlePass1Change(e.target.value) } />
                    <br /><br />
                    <TextField required id="new-pass2-input" placeholder="New Password Again" type="password" helperText={ this.state.passMatchText }
                        error={ !this.state.match } value={ this.state.password2 } onChange={ (e) => this.handlePass2Change(e.target.value) } />
                    <br /><br />
                    <div className="change-pass-button-container">
                        <Button className="change-pass-button" variant="contained" size="medium" onClick={ this.handleSubmitPassChange }>
                            Change Password
                        </Button>
                    </div>
                </div>
            </form>
        );
    }

}

export default ChangePass;
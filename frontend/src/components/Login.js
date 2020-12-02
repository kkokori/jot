import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';


const coreapi = require('coreapi')
var client = new coreapi.Client();
window.client = new coreapi.Client();
window.loggedIn = false;


class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            registerMode: false,
            error: false,
            username: "",
            email: "",
            password: "",
            errorMessage: "",
        };
    }

    componentDidMount()
    {

        fetch("api/users/")
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

    checkIfUser = () => 
    {
        let email = document.getElementById("email-input").value;
        // let emails = this.state.data.map(x => x.email);
        if (false)
            console.log("LOGIN");
        else
        {
            console.log("register");
            this.setState({
                emailState:
                {
                    invalid: true,
                    text: "Invalid email",
                }
            })
        }
    }

    handleEmailChange = (email) =>
    {
        this.setState({
            email: email,
        });
    }
    handlePassChange = (pass) =>
    {
        this.setState({
            password: pass,
        });
    }
    handleUsernameChange = (username) =>
    {
        this.setState({
            username: username,
        });
    }

    handleSubmitRegister = () =>
    {
        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        }

        console.log(data);
        fetch("api/register/",
            {
                withCredentials: true,
                credentials: 'include',
                method: 'POST',
                headers: {
                    //'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response =>
            {
                if (response.status >= 400)
                {
                    this.setState({
                        errorMessage:
                            <Typography variant="caption" color="error" >
                                Something went wrong.We could not register your account.Please try again.
                            </Typography>,
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
                    alert("Your account has been successfully registered. Try logging in.");
                    this.setState({
                        error: false,
                        errorMessage: "",
                        registerMode: false,
                        email: "",
                        username: "",
                        password: "",
                    });
                }
            });

    }

    handleSubmitLogin = () =>
    {
        const data = {
            username: this.state.username,
            password: this.state.password,
        }
        //const form = new FormData(document.getElementById('login-form'));
        fetch("api/token-auth/",
            {
                withCredentials: true,
                credentials: 'include',
                method: 'POST',
                headers: {
                    //'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response =>
            {
                if (response.status >= 400)
                {
                    this.setState({
                        errorMessage:
                            <Typography variant="caption" color="error">
                                Your username or password is incorrect.
                                <br />
                                Please try again, or&nbsp;
                                <Button onClick={ () =>
                                {
                                    this.setState({
                                        error: false,
                                        registerMode: true,
                                    })
                                } } size="small">register</Button> if you do not have an account.
                        </Typography>,
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
                    this.props.handleLogin(data);
            });
    }

    render()
    {
        const header = this.state.registerMode ? "Register for Jot." : "Login to Jot.";

        const form = this.state.registerMode ?
            (
                <div className="login-fields">
                    <TextField required autoComplete="on" error={ this.state.error } value={ this.state.username }
                        onChange={ (e) => this.handleUsernameChange(e.target.value) } id="username-input" placeholder="Username" type="text" />
                    <br /><br />
                    <TextField required autoComplete="on" error={ this.state.error } value={ this.state.email }
                        onChange={ (e) => this.handleEmailChange(e.target.value) } id="email-input" placeholder="Email" type="email" />
                    <br /><br />
                    <TextField required error={ this.state.error } value={ this.state.password }
                        onChange={ (e) => this.handlePassChange(e.target.value) } id="password-input" placeholder="Password" type="password" />
                    <br /><br />
                    <div className="login-button">
                        <Button onClick={ () =>
                        {
                            this.setState({
                                error: false,
                                registerMode: false,
                            })
                        } } size="small"  >Back to Login</Button>
                    </div>
                    <div className="register-button">
                        <Button onClick={ this.handleSubmitRegister } variant="contained" size="small">Register</Button>
                    </div>
                </div>
            )
            :
            (
                <div className="login-fields">
                    <TextField required autoComplete="on" error={ this.state.error } value={ this.state.username }
                        onChange={ (e) => this.handleUsernameChange(e.target.value) } id="username-input" placeholder="Username" type="text" />
                    <br /><br />
                    <TextField required error={ this.state.error } value={ this.state.password }
                        onChange={ (e) => this.handlePassChange(e.target.value) } id="password-input" placeholder="Password" type="password" />
                    <br /><br />
                    <div className="login-button">
                        <Button variant="contained" size="small" onClick={ this.handleSubmitLogin } >Login</Button>
                    </div>
                    <div className="register-button">
                        <Button onClick={ () =>
                        {
                            this.setState({
                                error: false,
                                registerMode: true,
                            })
                        } } size="small">Register</Button>
                    </div>
                </div>
            );

        return (
            <Grid container item className='login-container'
                justify='center' alignItems='center' direction='row'>
                <Grid item className='login-form-container'>
                    <form className="login-form" id="login-form">
                        <h2>{ header }</h2>
                        { this.state.errorMessage }
                        { this.state.successfulRegistration }
                        { form }
                    </form>
                </Grid>
            </Grid>
        );
    }

}

export default (Login);
import React, { Component } from 'react';

import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            emailState: {
                invalid: false,
                text: "",
            },
            passState: {
                invalid: false,
                text: "",
            },
            data: [],
            loaded: false,
            placeholder: "Loading..."
        };
    }

  /*  componentDidMount()
    {
        fetch("api/users")
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
*/
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

    render()
    {
        console.log(this.state.data)
        return (
            <form onSubmit={ () => { console.log("submitted") } } className="login-form">
                <h2>Login to Jot.</h2>
                <div className="login-fields">
                    <TextField required autoComplete="on" error={ this.state.emailState.invalid }
                        id="email-input" placeholder="Email" type="email" helperText={ this.state.emailState.text }/>
                    <br /><br />
                    <TextField required error={ this.state.passState.invalid } helperText={ this.state.passState.text }
                        id="password-input" placeholder="Password" type="password" />
                    <br /><br />
                    <div className="login-button">
                        <Button color="primary" variant="contained" size="small" type="submit" onSubmit={ this.checkIfUser }>Login</Button>
                    </div>
                    <div className="register-button">
                        <Link>Register</Link>
                    </div>
                </div>

            </form>
        );
    }

}

export default (Login);
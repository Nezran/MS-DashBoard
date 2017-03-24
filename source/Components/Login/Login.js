//////////////////////////////////////
// Login component
/////////////////////////////////////

import React from 'react';
import {TextField, RaisedButton}from 'material-ui';
import AuthorizeComponent from '../Authorize/Authorize';
import Auth from '../Auth/Auth';
import Vpnkey from 'material-ui/svg-icons/communication/vpn-key';
import User from 'material-ui/svg-icons/action/verified-user';

export default  class Login extends AuthorizeComponent {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        password: '',
        messageLogin: '',
        messageError: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        Auth.postUser(
            document.getElementsByName('username')[0].value,
            document.getElementsByName('password')[0].value,
            this.props.handleLogged
        );
        this.props.router.push('/');
    };

    render() {
        const iconStyles = {
            marginRight: 24,
        };

        return (
            <div className="login-page">
                <h1>Connection</h1>
                <form onSubmit={this.handleSubmit}>

                    <User style={iconStyles} color={'#9b59b6'}/>
                    <TextField
                        ref="username"
                        name="username"
                        hintText="Username"
                        errorText={this.state.messageError}
                    />
                    <br/>

                    <Vpnkey style={iconStyles} color={'#9b59b6'}/>
                    <TextField
                        name="password"
                        hintText="Password"
                        type="password"
                        errorText={this.state.messageError}
                    />
                    <br/>
                    <RaisedButton
                        label="Se connecter"
                        labelPosition="before"
                        primary={true}
                        type="submit"
                    />
                </form>
            </div>
        );
    }
};
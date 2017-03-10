import React from 'react';
import { Router, Route, Link, browserHistory  } from 'react-router'
import Axios from 'axios';
import { TextField, RaisedButton }from 'material-ui';
import Jwt from 'jwt-decode';
import _ from 'lodash';
import AuthorizeComponent from '../Authorize/Authorize';
import Auth from '../Auth/Auth';

export default  class Login extends AuthorizeComponent{
    constructor(props){
        super(props);

        console.log("log",this.props);
    }
    state = {
        username: '',
        password: '',
        messageLogin: '',
        messageError: '',
    }

    componentDidMount(){
        Axios.get('http://localhost:23000/api/projects')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        Auth.postUser(
            document.getElementsByName('username')[0].value,
            document.getElementsByName('password')[0].value,
            this.props.handleLogged
        );
        this.props.router.push('/');
        // this.setState({username:document.getElementsByName('username')[0].value, password: document.getElementsByName('password')[0].value}, (e) =>{
        //     // this.postUser();
        //     Auth();
        // });
    }
    // postUser = () => {
    //     Axios.post('http://localhost:23000/api/auth', {
    //         username: this.state.username,
    //         password: this.state.password
    //     })
    //     .then(function (response) {
    //
    //         console.log(response);
    //
    //         if(response.status == 200){
    //             this.setState({messageError: ''});
    //             console.log(Jwt(response.data));
    //
    //             const dataUser = Jwt(response.data);
    //             _.mapKeys(dataUser, (value,key) =>{
    //                 localStorage.setItem(key,value);
    //             });
    //             localStorage.setItem("token",response.data);
    //             console.log("props",this.props);
    //             this.props.router.push('/');
    //         }
    //     }.bind(this))
    //     .catch(function (error) {
    //         console.log(error);
    //         this.setState({messageError:'Connection pas réussi'});
    //     }.bind(this));
    // }
    render() {
        return (
            <div className="home-page">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        ref="username"
                        name="username"
                        hintText="Username"
                        errorText={this.state.messageError}
                    />
                    <br/>
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

                {/*<Link to="/accountsManagement">le lien</Link>*/}

            </div>
        );
    }
};
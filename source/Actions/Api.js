/**
 * Created by Mickael.LACOMBE on 13.03.2017.
 */

/**
 * Created by Mickael.LACOMBE on 28.02.2017.
 */
import Axios from 'axios';
import { TextField, RaisedButton }from 'material-ui';
import { Router, Route, Link, browserHistory  } from 'react-router'
import mitt from 'mitt'
import Jwt from 'jwt-decode';
import _ from 'lodash';


export default {
    createUser: (
        id,
        username,
        firstname,
        lastname,
        role,
        email,
        password,
    ) => {

        // console.log(id, username, firstname, lastname);
        // return false;
        return new Promise((resolve, reject) => {

            // Do an async task async task and then...
            //
            // if(/* good condition */) {
            //     resolve('Success!');
            // }
            // else {
            //     reject('Failure!');
            // }

            console.log(id, username, firstname, lastname);
            resolve('Success!');


            Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
            Axios.post('http://localhost:23000/api/user', {
                id:id,
                username:username,
                firstname:firstname,
                lastname:lastname,
                role:role,
                email:email,
                password:password
            })
                .then(function (response) {
                    // console.log("call1",response);
                    if (response.status == 200) {
                        // console.log("call2",response);
                        resolve('Success!');
                    }

                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    // this.setState({messageError: 'Connection pas réussi'});
                    reject('Failure!');
                }.bind(this));
        });
    },
    postUser: (
    id,
    username,
    firstname,
    lastname,
    role,
    email,
    password,
    ) => {

        // console.log(id, username, firstname, lastname);
        // return false;
       return new Promise((resolve, reject) => {

            // Do an async task async task and then...
            //
            // if(/* good condition */) {
            //     resolve('Success!');
            // }
            // else {
            //     reject('Failure!');
            // }

           console.log(id, username, firstname, lastname);
           resolve('Success!');


           Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
        Axios.put('http://localhost:23000/api/user', {
            id:id,
            username:username,
            firstname:firstname,
            lastname:lastname,
            role:role,
            email:email,
            password:password
        })
            .then(function (response) {
                // console.log("call1",response);
                if (response.status == 200) {
                    // console.log("call2",response);
                    resolve('Success!');
                }

            }.bind(this))
            .catch(function (error) {
                console.log(error);
                // this.setState({messageError: 'Connection pas réussi'});
                reject('Failure!');
            }.bind(this));
       });
    },
    deleteUser: (id) => {
        // console.log(id);
        // return false;

        Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
        Axios.delete('http://localhost:23000/api/user/'+id)
            .then(function (response) {
                console.log("call1",response);
                if (response.status == 200) {
                    //
                    console.log("call2",response);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                // this.setState({messageError: 'Connection pas réussi'});
            }.bind(this));
    }
}


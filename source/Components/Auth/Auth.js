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
    logout: (handleLogged) =>{
        localStorage.clear();
        localStorage.setItem("role","guest");
        // Router.push('/');
        // console.log(Router);

        handleLogged(false);
        // browserHistory.push("/");
        // window.location.reload();

    },
    isAuth: () =>{
        const auth = localStorage.getItem('token');
        // console.log("auth",auth);
        return  auth != null ? true : false;
    },
    postUser: (username, password, handleLogged) => {
        // console.log(username, password);
        Axios.post('http://localhost:23000/api/auth', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response);

                // console.log(response);
                if (response.status == 200) {
                    // this.setState({messageError: ''});
                    // console.log(Jwt(response.data));
                    const dataUser = Jwt(response.data);
                    _.mapKeys(dataUser, (value, key) => {
                        localStorage.setItem(key, value);
                    });
                    localStorage.setItem("token", response.data);

                    handleLogged(true);

                    //browserHistory.push("/project");
                    //window.location.reload();

                    // console.log("props", this.props);
                    // this.props.router.push('/');
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                // this.setState({messageError: 'Connection pas réussi'});
            }.bind(this));
    }
}


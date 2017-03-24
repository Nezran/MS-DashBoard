//////////////////////////////////////
// Auth component
// Authenifie the user when he submit login
/////////////////////////////////////

import Axios from 'axios';
import {browserHistory} from 'react-router'
import Jwt from 'jwt-decode';
import _ from 'lodash';


export default {
    logout: (handleLogged) => {
        localStorage.clear();
        localStorage.setItem("role", "guest");
        browserHistory.push('/projects');
        handleLogged(false);
        window.location.reload();

    },
    isAuth: () => {
        const auth = localStorage.getItem('token');
        return auth != null ? true : false;
    },
    postUser: (username, password, handleLogged) => {
        Axios.post('http://localhost:23000/api/auth', {
            username: username,
            password: password
        })
            .then(function (response) {
                if (response.status == 200) {
                    const dataUser = Jwt(response.data);
                    _.mapKeys(dataUser, (value, key) => {
                        localStorage.setItem(key, value);
                    });
                    localStorage.setItem("token", response.data);

                    handleLogged(true);
                }
            }.bind(this))
            .catch(function (e) {
                console.log(e);
            }.bind(this));
    }
}
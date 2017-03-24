/**
 * Created by Mickael.LACOMBE on 28.02.2017.
 */
import Axios from 'axios';

export default {
    ///////////////////////////////////////////////////////
    // User management
    //////////////////////////////////////////////////////
    createUser: (id,
                 username,
                 firstname,
                 lastname,
                 role,
                 email,
                 password,) => {
        return new Promise((resolve, reject) => {
            Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
            Axios.post('http://localhost:23000/api/user', {
                id: id,
                username: username,
                firstname: firstname,
                lastname: lastname,
                role: role,
                email: email,
                password: password
            })
                .then(function (response) {
                    if (response.status == 200) {
                        resolve('Success!');
                    }

                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    reject('Failure!');
                }.bind(this));
        });
    },
    postUser: (id,
               username,
               firstname,
               lastname,
               role,
               email,
               password,) => {
        return new Promise((resolve, reject) => {

            console.log(id, username, firstname, lastname);
            resolve('Success!');


            Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
            Axios.put('http://localhost:23000/api/user', {
                id: id,
                username: username,
                firstname: firstname,
                lastname: lastname,
                role: role,
                email: email,
                password: password
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
        Axios.delete('http://localhost:23000/api/user/' + id)
            .then(function (response) {
                console.log("call1", response);
                if (response.status == 200) {
                    //
                    console.log("call2", response);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                // this.setState({messageError: 'Connection pas réussi'});
            }.bind(this));
    },

    ///////////////////////////////////////////////////////
    // Project management
    //////////////////////////////////////////////////////

    createProject: (title,
                    description,
                    startDate,
                    endDate,
                    deadline,
                    status,
                    nbWorker,
                    tags) => {

        return new Promise((resolve, reject) => {
            resolve('Success!');


            Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
            Axios.post('http://localhost:23000/api/projects', {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate,
                deadline: deadline,
                status: status,
                nbWorker: nbWorker,
                tags: tags
            })
                .then(function (response) {
                    if (response.status == 200) {
                        resolve('Success!');
                    }

                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    reject('Failure!');
                }.bind(this));
        });
    },

    updateProject: (id,
                    title,
                    description,
                    startDate,
                    endDate,
                    deadline,
                    status,
                    nbWorker,
                    tags,
                    projectManagerId,
                    projectManagerUsername,
                    projectManagerFirstname,
                    projectManagerLastname,
                    projectManagerEmail,
                    projectManagerPassword,
                    ) => {

        return new Promise((resolve, reject) => {

            resolve('Success!');


            Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
            Axios.put('http://localhost:23000/api/projects', {
                id: id,
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate,
                deadline: deadline,
                status: status,
                nbWorker: nbWorker,
                tags: tags,
                projectManager: {
                    id: projectManagerId,
                    username: projectManagerUsername,
                    firstname: projectManagerFirstname,
                    lastname: projectManagerLastname,
                    email: projectManagerEmail,
                    password: projectManagerPassword
                }
            })
                .then(function (response) {
                    if (response.status == 200) {
                        resolve('Success!');
                    }

                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    reject('Failure!');
                }.bind(this));
        });
    },

    deleteProject: (id) => {

        Axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
        Axios.delete('http://localhost:23000/api/projects', {
            data:{id: id}
        })
            .then(function (response) {
                if (response.status == 200) {
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this));
    }
}
//////////////////////////////////////
// Accounts component
// Page for the account management
/////////////////////////////////////

import React from 'react';
import AuthorizeComponent from '../Authorize/Authorize';
import Axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import CardUserActions from './CardUserActions';
import CreateAccount from './CreateAccount';

export default  class Accounts extends AuthorizeComponent {

    componentDidMount() {
        this.getDatas();
    }

    state = {
        create: '',
        users: [],
        open: false,
    };

    getDatas = () => {
        Axios.defaults.baseURL = 'http://localhost:23000/api';
        Axios.get('/users')
            .then((response) => {
                console.log("data refreshs");
                this.setState({
                    users: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangement = () => {
        this.getDatas();
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false}, () => {
        });
    };

    render() {
        const cardUser =
            this.state.users.map(user => {
                return <CardUserActions handleLoader={this.props.handleLoader} handleChangement={this.handleChangement}
                                        key={user.id} {...user}/>;
            });

        return (
            <div className="home-page">

                {console.log("open", this.state.open)}

                <h1>Gestion des comptes</h1>

                {this.state.create}
                {this.state.open ?
                    <CreateAccount handleLoader={this.props.handleLoader} handleChangement={this.handleChangement}
                                   open={this.state.open} handleClose={this.handleClose}/> : ""}
                <FlatButton label="Ajouter un utilisateur" onTouchTap={this.handleOpen} secondary={true}/>

                {cardUser}
            </div>
        );
    }
};
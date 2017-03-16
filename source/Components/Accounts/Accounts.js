import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import AuthorizeComponent from '../Authorize/Authorize';
import Axios from 'axios';
import {Card, CardActions, CardHeader,  CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardUserActions from './CardUserActions';
import Dialog from 'material-ui/Dialog';
import CreateAccount from './CreateAccount';

export default  class Accounts extends AuthorizeComponent {
    // componentWillMount(){
    //     this.setState({crate:<CreateAccount open={this.state.open} handleClose={this.handleClose}/>});
    // }
    componentDidMount() {


        this.getDatas();


    }

    state={
        create:'',
        users: [],
        open:false,
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
        console.log("call refresh");
        this.getDatas();
        // this.componentDidMount();
        // this.setState({open: true}, () =>{ });
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false}, () =>{ });
    };

    render() {

        const iconStyles = {
            marginRight: 24,
        };

        
        const cardUser =
          this.state.users.map(user => {
            return <CardUserActions handleLoader={this.props.handleLoader} handleChangement={this.handleChangement} key={user.id} {...user}/>;
        });

        return (
            <div className="home-page">

                {console.log("open",this.state.open)}

                <h1>Gestion des comptes</h1>

                {this.state.create}
                {this.state.open ? <CreateAccount  handleLoader={this.props.handleLoader}  handleChangement={this.handleChangement} open={this.state.open} handleClose={this.handleClose}/> : ""}
                <FlatButton label="Ajouter un utilisateur" onTouchTap={this.handleOpen} secondary={true}/>

                {cardUser}

                {/*{console.log(this.state.users)}*/}

            </div>
        );
    }
};
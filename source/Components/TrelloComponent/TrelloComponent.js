/**
 * Created by Mickael.LACOMBE on 16.03.2017.
 */
import React from 'react';
// import TrelloAPI from'../../trello';
require('../../Api/trello');
// var test = require('../../trello');
import Axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TrelloBoards from './TrelloBoards';
import RaisedButton from 'material-ui/RaisedButton';

export default class TrelloComponent extends React.Component{
    defaultState = {
        trello_token:'',
        trello_user:'',
        trello_response_token:'',
        api_key: 'ff9ada8463a83c083553e753520ffbec',
        trello_boards: [],
        trello_connected: false,
        trello_user_data:'',
        trello_boards_id:[],
        setParent:'',

    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.state.setParent = this.props.getTrelloProjects;
    }

    componentWillMount(){
        if(localStorage.getItem("trello_token")){
            this.AuthenticateTrello();
        }
    }

    setParent(data){
         this.state.setParent(data);
    }

    getTrelloMembers = () => {
        Axios.get('https://api.trello.com/1/members/'+this.state.trello_user+'?key='+this.state.api_key+'&token='+this.state.trello_token)
            .then( (response) => {
                this.setState({trello_user_data:response.data, trello_boards_id: response.data.idBoards }, (f) => {
                    this.state.trello_boards_id.map((board) => {
                        this.getTrelloBoard(board);
                    }, e => {
                        this.setParent(this.state.trello_boards);
                        }
                    );
                });
            })
            .catch( (e) => {
                console.log(e);
            });
    }

    getTrelloBoard = (board) => {
            Axios.get('https://api.trello.com/1/boards/'+board+'?key='+this.state.api_key+'&cards=all&lists=all&token='+this.state.trello_token)
                .then( (response) => {
                    // return response.data;
                    this.setState({
                        trello_boards: this.state.trello_boards.concat([response.data])
                    }, e => {
                        this.setParent(this.state.trello_boards);
                    });

                })
                .catch( (e) => {
                    console.log(e);
                });
    }

    AuthenticateTrello = () => {

        Trello.authorize({
            name: "DashBoard Project",
            type: "popup",
            interactive: true,
            expiration: "never",
            persist: true,
            success: (e) => {

                var token = Trello.token();
                // window.location.replace("/auth?token=" + token);

                Axios.get('https://api.trello.com/1/tokens/'+token+'?key=ff9ada8463a83c083553e753520ffbec&token='+token)
                    .then((response) => {
                        this.setState({trello_connected:true,trello_response_token:response.data,trello_token:token, trello_user:response.data.idMember}, (e) => {
                            this.getTrelloMembers();
                        });
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            scope: { write: false, read: true },

        });
    }

    trelloDisconnect = () =>{

        Axios.delete('https://api.trello.com/1/tokens/'+this.state.trello_token+'?key=ff9ada8463a83c083553e753520ffbec&token='+this.state.trello_token)
            .then((response) => {
                localStorage.removeItem("trello_token","exp");
                this.setState(this.defaultState, e => {
                    Trello.deauthorize();
                    this.setParent([]);
                });
            })
            .catch((e) => {
                console.log(e);
            });


    }

    render(){
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            card: {
                width: 500,
                margin: 4,
            },
            icons: {
                marginRight: 24,
            }
        };
        if(this.state.trello_connected){
            return(
                <div>
                    <h1>Trello</h1>

                    <p>
                        Connecté en tant que : {this.state.trello_user_data.username}
                        <img src={"https://trello-avatars.s3.amazonaws.com/"+this.state.trello_user_data.avatarHash+"/30.png"} />
                    </p>
                    <RaisedButton  label="Déconnexion" onClick={this.trelloDisconnect} primary={true} />
                    <p></p>
                    <span style={styles.wrapper}>
                        {
                            this.state.trello_boards.map((board,i) => {
                                return <TrelloBoards {...board} key={i} api_key={this.state.api_key} trello_token={this.state.trello_token} />
                            }, e => {
                            })
                        }
                    </span>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Trello</h1>
                    <RaisedButton  label="Connecter avec Trello" onClick={this.AuthenticateTrello} primary={true} />
                </div>
            )
        }
    }
}
/**
 * Created by Mickael.LACOMBE on 16.03.2017.
 */
import React from 'react';
// import TrelloAPI from'../../trello';
require('../../trello');
// var test = require('../../trello');
import Axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


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

    };

    constructor(props) {

        console.log(Trello)
        super(props);

        // this.trello = trello;

        if(localStorage.getItem("trello_token")){
            this.AuthenticateTrello();
        }

        this.state = this.defaultState;

    }

    // state={
    //   trello_token:'',
    //   trello_user:'',
    //     trello_response_token:'',
    //   api_key: 'ff9ada8463a83c083553e753520ffbec',
    //     trello_boards: [],
    //     trello_connected: false,
    //     trello_user_data:'',
    //     trello_boards_id:[],
    // };


    componentWillMount(){

    }

    getTrelloMembers = () => {

        Axios.get('https://api.trello.com/1/members/'+this.state.trello_user+'?key='+this.state.api_key+'&token='+this.state.trello_token)
            .then( (response) => {
                console.log(response);
                this.setState({trello_user_data:response.data, trello_boards_id: response.data.idBoards }, (f) => {
                    this.state.trello_boards_id.map((board) => {
                        this.getTrelloBoard(board);
                    });
                });
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    getTrelloBoard = (board) => {

            Axios.get('https://api.trello.com/1/boards/'+board+'?key='+this.state.api_key+'&token='+this.state.trello_token)
                .then( (response) => {
                    // return response.data;
                    this.setState({
                        trello_boards: this.state.trello_boards.concat([response.data])
                    });

                })
                .catch( (error) => {
                    console.log(error);
                });


    }

    AuthenticateTrello = () => {

        // console.log(this.state);

        Trello.authorize({
            name: "DashBoard Project",
            type: "popup",
            interactive: true,
            expiration: "never",
            persist: true,
            success: (e) => {
                console.log(e,"connect success");

                var token = Trello.token();
                // window.location.replace("/auth?token=" + token);

                Axios.get('https://api.trello.com/1/tokens/'+token+'?key=ff9ada8463a83c083553e753520ffbec&token='+token)
                    .then((response) => {
                        // console.log(response);
                        this.setState({trello_connected:true,trello_response_token:response.data,trello_token:token, trello_user:response.data.idMember}, (e) => {
                            this.getTrelloMembers();
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            scope: { write: false, read: true },

        });
    }

    trelloDisconnect = () =>{

        Axios.delete('https://api.trello.com/1/tokens/'+this.state.trello_token+'?key=ff9ada8463a83c083553e753520ffbec&token='+this.state.trello_token)
            .then((response) => {
                // console.log(response);
                this.setState(this.defaultState);
                console.log()
                localStorage.removeItem("trello_token");

            })
            .catch((error) => {
                console.log(error);
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
        const TrelloBoards = this.state.trello_boards.map((board,i) => {
            // var datas = this.getTrelloBoard(board);
            // var test = this.getTrelloBoard(board).then( (result) => {
            //    return result;
            // });
            //
            // console.log(test);
            return(
                    <Card key={i} style={styles.card}>
                        <CardHeader
                            title={board.name}
                            subtitle={'Fin le '}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>

                        </CardText>
                    </Card>
            );


        });
        if(this.state.trello_connected){
            return(
                <div>
                    <h1>Trello</h1>
                    {console.log(this.state)}
                    <p>
                        Connecté en tant que : {this.state.trello_user_data.username}
                        <img src={"https://trello-avatars.s3.amazonaws.com/"+this.state.trello_user_data.avatarHash+"/30.png"} />
                    </p>
                    <FlatButton  label="Déconnexion" onClick={this.trelloDisconnect} />

                    <span style={styles.wrapper}>
                        {TrelloBoards}
                    </span>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Trello</h1>

                    <FlatButton  label="Connecter avec Trello" onClick={this.AuthenticateTrello} />

                </div>
            )
        }
        // return(
        //     <div>
        //         <h1>TrelloComponent</h1>
        //
        //         {console.log(this.state)}
        //
        //         {
        //             this.state.trello_connected ?
        //                     "Connecté en tant que : "+
        //                     <p>{this.state.trello_user_data.username}</p>+
        //                     <img src={"https://trello-avatars.s3.amazonaws.com/"+this.state.trello_user_data.avatarHash+"/170.png"} />
        //                 :  <FlatButton  label="Connecter avec TrelloComponent" onClick={this.AuthenticateTrello} />
        //         }
        //         <span style={styles.wrapper}>
        //
        //         {TrelloBoards}
        //
        //         </span>
        //     </div>
        // )
    }
}
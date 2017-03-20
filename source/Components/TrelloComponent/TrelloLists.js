/**
 * Created by Mickael.LACOMBE on 17.03.2017.
 */
/**
 * Created by Mickael.LACOMBE on 17.03.2017.
 */
/**
 * Created by Mickael.LACOMBE on 16.03.2017.
 */
import React from 'react';
import Axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TrelloCards from './TrelloCards';

export default class TrelloLists extends React.Component {
    tes = 9;
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            closed:this.props.closed,
            id:this.props.id,
            idBoard:this.props.idBoard,
            name:this.props.name,
            pos:this.props.pos,
            subscribed:this.props.subscribed,
            api_key:this.props.api_key,
            trello_token:this.props.trello_token,
        },
            (finish) =>{
                Axios.get('https://api.trello.com/1/lists/'+this.state.id+'/cards?key='+this.state.api_key+'&token='+this.state.trello_token)
                    .then((response) => {
                        // console.log(response);
                        this.setState({cards:response.data});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    }

    stats={
        closed:'',
        id:'',
        idBoard: '',
        name:'',
        pos:'',
        subscribed: '',
        api_key:'',
        trello_token:'',
        cards:[],
    }

    render(){
        return(
            <Card>
                <CardHeader
                    title={this.state.name}
                    subtitle={''}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {
                        this.state.cards ?
                            this.state.cards.map((card,i) => {
                                return <TrelloCards key={i} {...card}/>
                            })
                         : ""
                    }
                </CardText>
            </Card>
        )
    }
}
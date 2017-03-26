//////////////////////////////////////
// trello Board component
// component for 1 board from trello.
// called from TrelloComponent
// render trelloLists
/////////////////////////////////////
import React from 'react';
require('../../Api/trello');
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TrelloLists from './TrelloLists';
import Lock from 'material-ui/svg-icons/action/lock';
import People from 'material-ui/svg-icons/social/people';

export default class TrelloBoards extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            desc:this.props.desc,
            id:this.props.id,
            labelNames:this.props.labelNames,
            name:this.props.name,
            shortUrl:this.props.shortUrl,
            url:this.props.url,
            lists:this.props.lists,
            cards:this.props.cards,
            params: this.props.prefs,
        });
    }

    stats={
        desc:'',
        id:'',
        labelNames: [],
        name:'',
        shortUrl:'',
        url:'',
        lists: [],
        cards:[],
        params:[],
    }

    countState = (state) =>{
        var tot = 0;
        state.map((item,index) => {
            tot ++
        });

        return tot
    }

    render(){

        const styles={
            marginLeft: 10,
        }

        const styleBack={
            backgroundImage: this.state.params.backgroundImage ? "url('"+this.state.params.backgroundImage+"')" : "" ,
            backgroundSize: "cover",
            backgroundColor: this.state.params.backgroundColor ? this.state.params.backgroundColor : "" ,
        }

        const styleSpan={
            backgroundColor: this.state.params.backgroundImage ? "rgba(255, 255, 255, 0.80)" : "",
            padding: this.state.params.backgroundImage ? "20px" : "",
        }

        const cardTitle = () =>  {
            return(
                <span style={styleSpan}>
                    {this.state.name}
                    {this.state.params.permissionLevel == "private" ?  <Lock style={styles} /> : ""}
                    {this.state.params.permissionLevel == "org" ? <People style={styles} ></People> : ""}
                </span>
            )
        };

        return(
            <Card
            style={styleBack}
            >
                <CardHeader
                    title={cardTitle()}
                    subtitle={'Liste : ' + this.countState(this.state.lists) + ' Carte : '+ this.countState(this.state.cards)}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {
                        this.state.lists.map((list,i) => {
                            return <TrelloLists key={i} {...list} api_key={this.props.api_key} trello_token={this.props.trello_token}/>
                        })
                    }
                </CardText>
            </Card>
        )
    }
}
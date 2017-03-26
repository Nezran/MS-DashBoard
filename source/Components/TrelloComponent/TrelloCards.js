//////////////////////////////////////
// trello Cards component
// component for 1 cards from trello.
// called from TrelloLists
// render card of trello
/////////////////////////////////////
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export default class TrelloCards extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            id:this.props.id,
            name:this.props.name,
        });
    }

    stats={
        name:'',
        id:'',
    }

    render(){
        return(
            <Card>
                <CardHeader
                    title={this.state.name}
                    subtitle={''}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText expandable={false}>
                </CardText>
            </Card>
        )
    }
}
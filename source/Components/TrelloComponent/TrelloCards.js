/**
 * Created by Mickael.LACOMBE on 17.03.2017.
 */
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
// import TrelloAPI from'../../trello';
// var test = require('../../trello');
import Axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
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
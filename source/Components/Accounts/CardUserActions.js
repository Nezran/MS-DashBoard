/**
 * Created by micka on 11/03/2017.
 */
import React from 'react';
import {Card, CardActions, CardHeader,  CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class CardUserActions extends React.Component{
  componentDidMount() {
    this.setState({
      id: this.props.id,
      username: this.propsusername,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      role: this.props.role,
      email: this.props.email,
      password: this.props.password,
    });

  }

  state={
    expanded: false,
    users: [],
  };

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };
  render() {

    const iconStyles = {
      marginRight: 24,
    };

    const cardStyles ={
      margin: 20,
    };

    return (

      <div>
        {console.log(this.state)}
        <div key={this.state.id} style={cardStyles}>
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
              title={this.state.lastname + " " +  " " + this.state.firstname}
              subtitle={this.state.role}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <p>Email : {this.state.email}</p>
              <p>Pseudo : {this.state.username}</p>
              demaner card
            </CardText>
            <CardActions>
              <FlatButton label="Modifier" onTouchTap={this.handleExpand}/>
              <FlatButton label="Ok" onTouchTap={this.handleReduce} />
            </CardActions>
          </Card>
        </div>
      </div>
    )

  }
}
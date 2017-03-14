/**
 * Created by micka on 11/03/2017.
 */
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Router, Route, Link, browserHistory } from 'react-router'

// TODO staeless component
export default class Index extends React.Component{
  componentDidMount(){
    // console.log(this.props);/
  }
  render() {
    return(

        <GridTile
          key={this.props.name}
          title={this.props.path}
          subtitle={<span>by <b>{this.props.component}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          cols={1}
          rows={1}
        />

    )
}
}
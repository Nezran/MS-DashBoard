import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AuthorizeComponent from '../Authorize/Authorize';
import Index from '../Index/Index';
import { Router, Route, Link, browserHistory } from 'react-router'
import _ from 'lodash';
import {GridList, GridTile} from 'material-ui/GridList';
require('./wrapper.css');
import Auth from '../Auth/Auth';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CircularProgress from 'material-ui/CircularProgress';


import {
    lightBlue50,purple50
} from 'material-ui/styles/colors';


export default class Wrapper extends AuthorizeComponent {

    constructor(props) {
        super(props);

    }
    componentWillMount(){
        // console.log("children",this.props.children);
        // this.setState({logged: Auth.isAuth()});
        // console.log(Auth);


        // console.log("props",this.props.route.isLogged)

        console.log(this.props.children);
    }
    static muiName = 'FlatButton';

    // state = {
    //     logged: this.props.route.isLogged,
    // };

    state ={
        loader: false,
        logged : localStorage.getItem('token') ? true : false,
    };

    handleChange = (logged) => {
        console.log("logged",logged);
        this.setState({logged: logged});
    };

    renderLoader = () => {

        this.setState({loader: this.state.loader ? false : true});

    }

    handleSignOut = () =>{


        // console.log(this.props);
        //this.props.route.handler(true);
        // localStorage.clear();

        // console.dir(Auth.logout());

        const func = this.handleChange;
        Auth.logout(func);


        //console.log("logout",this.props);
        // this.props.router.push('/');

    }

    render() {


      const styles = {
        root: {

          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          float: 'left',
          width: "25%",


        },
        gridList: {

          width: "100%",
          overflowY: 'auto',
          float: "left",
        },
      };

        const Logged = (props) => (
            <div>
                <IconMenu
                    {...props}
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out"  onClick={this.handleSignOut}/>

                </IconMenu>

                <FlatButton  label="Sign out" onClick={this.handleSignOut} />
                <FlatButton>
                    <Link to={`/`}>Accueil</Link>
                </FlatButton>
                <FlatButton label="Default" />
                <FlatButton>
                    <Link to={`/accountsManagement`}>Gestion de compte</Link>
                </FlatButton>
                <FlatButton>
                    <Link to={`/projectsManagement`}>Gérer les projets</Link>
                </FlatButton>
                <FlatButton>
                    <Link to={`/projects`}>les projets</Link>
                </FlatButton>
            </div>
        );
        const Login =  () => {
            const colors =  {
                color:lightBlue50
            }
            return(
               <FlatButton label="Login" href="/login" labelStyle={colors} />
             );
        };
        Logged.muiName = 'IconMenu';
        console.log("wrapper",this.props);
        const func = this.handleChange;
        const funcLoader = this.renderLoader;
        const childWithProps = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                    handleLogged: func,
                    handleLoader: funcLoader,
                });
            }
        );
      const styleButton = {
          color: purple50,
          fontWeight: 100,
      }
        const childmenu = this.props.route.childRoutes.map(child => {
            if(child.name){
                if(child.authorizedRoles){
                    if((_.indexOf(child.authorizedRoles, localStorage.getItem("role")) >= 0)){
                        return (
                            <FlatButton
                                key={child.path}
                                label={child.name}
                                href={child.path}
                                style={styleButton}
                            />
                        )
                    }
                }else{

                    return (
                        <FlatButton
                            key={child.path}
                            label={child.name}
                            href={child.path}
                            style={styleButton}

                        />
                    )
                }
            }
        });

      const indexComponent = this.props.route.childRoutes.map(child => {
        if(child.name){
          if(child.authorizedRoles){
            if((_.indexOf(child.authorizedRoles, localStorage.getItem("role")) >= 0)){
              return (<Index {...child}/>)
            }
          }else{

            return (
            ""
            )
          }
        }
      });


        if(Auth.isAuth()){
            childmenu.push(<FlatButton  label="Se déconnecter" onClick={this.handleSignOut}  style={styleButton} />);
        }

        childmenu.muiName = 'IconMenu';


        return (
            <div>

                {console.log(Router)}
                <header className="header">
                    <FlatButton
                        label="MS DashBoard"
                        href={`/`}
                    />
                    <div className="menuLink">
                        {childmenu}
                    </div>
                </header>
                {/*<a onClick={this.renderLoader}>toggle loader</a>*/}

                {
                   this.state.loader ?
                       <div className="loader">
                           <CircularProgress size={80} thickness={5} />
                       </div>
                       :
                       ""
                }


                {console.log("authW",this.state.logged)}
                {/*<AppBar*/}
                    {/*title={<Link to={`/`}>MS DashBoard</Link>}*/}
                    {/*iconElementLeft={<IconButton><NavigationClose /></IconButton>}*/}
                {/*/>*/}
                {/*// iconElementRight={this.state.logged ? <Logged /> : <Login />}*/}
                <div className="content">
                        {childWithProps}
                </div>

                <footer className="footer">
                    <i>Créé par Stéphane martignier & Mickaël Lacombe</i>
                </footer>
            </div>
        );
    }
}

//////////////////////////////////////
// Wrapper component
// Generate menu for all the pages, display state of application (logged or not by exemple)
/////////////////////////////////////

import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AuthorizeComponent from '../Authorize/Authorize';
import { Router, Link, } from 'react-router'
import _ from 'lodash';
require('./wrapper.css');
import Auth from '../Auth/Auth';
import CircularProgress from 'material-ui/CircularProgress';


import {
    lightBlue50,purple50
} from 'material-ui/styles/colors';


export default class Wrapper extends AuthorizeComponent {

    constructor(props) {
        super(props);

    }
    componentWillMount(){
    }
    static muiName = 'FlatButton';

    state ={
        loader: false,
        logged : localStorage.getItem('token') ? true : false,
    };

    handleChange = (logged) => {
        this.setState({logged: logged});
    };

    renderLoader = () => {
        this.setState({loader: this.state.loader ? false : true});
    };

    handleSignOut = () =>{
        const func = this.handleChange;
        Auth.logout(func);
    };

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
            };
            return(
               <FlatButton label="Login" href="/login" labelStyle={colors} />
             );
        };
        Logged.muiName = 'IconMenu';
        const func = this.handleChange;
        const funcLoader = this.renderLoader;

        // intercept children component
        const childWithProps = React.Children.map(this.props.children, child => {

            // we clone component and inject props
            return React.cloneElement(child, {
                    handleLogged: func,
                    handleLoader: funcLoader,
                });
            }
        );

      const styleButton = {
          color: purple50,
          fontWeight: 100,
      };
        // loop on routes child
        const childmenu = this.props.route.childRoutes.map(child => {
            if(child.name){
                // if route protected
                if(child.authorizedRoles){
                    // if user has access
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
                        // if no protection
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

        if(Auth.isAuth()){
            childmenu.push(<FlatButton  label="Se déconnecter" onClick={this.handleSignOut}  style={styleButton} />);
        }

        childmenu.muiName = 'IconMenu';

        return (
            <div>
                <header className="header">
                    <FlatButton
                        label="MS DashBoard"
                        href={`/`}
                    />
                    <div className="menuLink">
                        {childmenu}
                    </div>
                </header>
                {
                   this.state.loader ?
                       <div className="loader">
                           <CircularProgress size={80} thickness={5} />
                       </div>
                       :
                       ""
                }
                <div className="content">
                        {childWithProps}
                </div>

                <footer className="footer">
                    <i>Créé par Stéphane Martignier & Mickaël Lacombe</i>
                </footer>
            </div>
        );
    }
}

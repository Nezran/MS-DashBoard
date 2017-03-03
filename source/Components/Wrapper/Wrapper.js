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
import { Router, Route, Link, browserHistory } from 'react-router'

require('./wrapper.css');
import Auth from '../Auth/Auth';

import {
    lightBlue50
} from 'material-ui/styles/colors';


export default class Wrapper extends AuthorizeComponent {

    componentWillMount(){
        console.log("children",this.props.children);
        // this.setState({logged: Auth.isAuth()});
    }
    static muiName = 'FlatButton';

    state = {
        logged: Auth.isAuth(),
    };

    handleChange = (event, logged) => {
        this.setState({logged: logged});
    };

    handleSignOut(){
        // localStorage.clear();
        Auth.logout();

        console.log("logout",this.props);
        // this.props.router.push('/');

    }

    render() {
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
                    <MenuItem primaryText="Sign out" />

                </IconMenu>
                <FlatButton  label="Sign out" onClick={this.handleSignOut} />
                <FlatButton>
                    <Link to={`/`}>Accueil</Link>
                </FlatButton>
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
        console.log("wrapper",this.props)
        return (
            <div>
                {console.log("authW",this.state.logged)}

                <AppBar
                    title={<Link to={`/`}>MS DashBoard</Link>}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    iconElementRight={this.state.logged ? <Logged /> : <Login />}
                />
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }

    // render() {
    //     return (
    //         <FlatButton {...this.props} label="Login" />
    //     );
    // }
}




//
// /**
//  * This example is taking advantage of the composability of the `AppBar`
//  * to render different components depending on the application state.
//  */
// class AppBarExampleComposition extends Component {
//     state = {
//         logged: true,
//     };
//
//     handleChange = (event, logged) => {
//         this.setState({logged: logged});
//     };
//
//     render() {
//         return (
//             <div>
//                 <Toggle
//                     label="Logged"
//                     defaultToggled={true}
//                     onToggle={this.handleChange}
//                     labelPosition="right"
//                     style={{margin: 20}}
//                 />
//                 <AppBar
//                     title="Title"
//                     iconElementLeft={<IconButton><NavigationClose /></IconButton>}
//                     iconElementRight={this.state.logged ? <Logged /> : <Login />}
//                 />
//             </div>
//         );
//     }
// }
//

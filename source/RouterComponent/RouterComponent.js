//////////////////////////////////////
// Router component
// Declare the route and the roles authorize to access each route
// Declaring route :
//
// How to declare route
// path : url
// component : component to call
// name : name that will be displayed in the menu, don't decalre if the route doesn't need to be displayed in menu
// authorizedRoles : delcare wich role can access the route

// All route pass by the wrapper, he display the template of the application
/////////////////////////////////////

import React from 'react';
import {Router, Route, IndexRoute, History, hashHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Dashboard from './../Components/Dashboard/Dashboard';
import Accounts from './../Components/Accounts/Accounts';
import Projects from './../Components/Projects/Projects';
import Login from './../Components/Login/Login';
import PageNotFound from './../Components/PageNotFound/PageNotFound';
import NotAuthorized from './../Components/NotAuthorized/NotAuthorized';
import Wrapper from './../Components/Wrapper/Wrapper';
import Project from './../Components/Project/Project';
import TrelloComponent from '../Components/TrelloComponent/TrelloComponent';

import {}  from 'material-ui/svg-icons/device/airplanemode-active';

export default class RouterComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router history={createBrowserHistory()}>
                    <Route path="/" component={Wrapper}>
                        <IndexRoute component={Dashboard}/>
                        <Route path="/projects" component={Dashboard} name="Projets"/>
                        <Route path="/projects/:id" component={Project}/>
                        <Route path="/trello" component={TrelloComponent} name="Trello"/>
                        <Route path="/projectsManagement" authorizedRoles={['Project Manager']} component={Projects} name="Gérer mes projets "/>
                        <Route path="/accountsManagement" authorizedRoles={['Administrator']} component={Accounts} name="Gérer les comptes"/>
                        <Route path="/login" component={Login} authorizedRoles={['guest']} handler={this.handleLogged} name="Se connecter"/>
                        <Route path="/noAccess" component={NotAuthorized}/>
                        <Route path="*" component={PageNotFound}/>
                    </Route>
                </Router>
            </div>
        );
    }
}
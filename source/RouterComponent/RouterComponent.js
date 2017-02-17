import React from 'react';
import { Router, Route, IndexRoute, History } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Dashboard from './../Components/Dashboard/Dashboard';
import Accounts from './../Components/Accounts/Accounts';
import Login from './../Components/Login/Login';
import PageNotFound from './../Components/PageNotFound/PageNotFound';

export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={createBrowserHistory()}>
               <Route path="/" component={Dashboard} />
               <Route path="/projects" component={Dashboard} />
               <Route path="/projectsManagement" authorizedRoles={['projectManager']} component={Dashboard} />
               <Route path="/accountsManagement" authorizedRoles={['admin']} component={Accounts} />
               <Route path="/login" component={Login} />
               <Route path="*" component={PageNotFound} />
            </Router>
        );
    }
}
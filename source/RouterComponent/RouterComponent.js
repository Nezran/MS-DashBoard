import React from 'react';
import { Router, Route, IndexRoute, History } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Dashboard from './../Components/Dashboard/Dashboard';
import Accounts from './../Components/Accounts/Accounts';
import PageNotFound from './../Components/PageNotFound/PageNotFound';

export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={createBrowserHistory()}>
               <Route path="/" component={Accounts} />
               <Route path="accountsManagement" component={Dashboard} />


               <Route path="/projects" component={Dashboard} />
               <Route path="/projectsManagement" component={Dashboard} />
               <Route path="/accountsManagement" component={Dashboard} />
               <Route path="*" component={PageNotFound} />
            </Router>
        );
    }
}
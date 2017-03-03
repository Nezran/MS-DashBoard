import React from 'react';
import {Router, Route, IndexRoute, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Dashboard from './../Components/Dashboard/Dashboard';
import Accounts from './../Components/Accounts/Accounts';
import Login from './../Components/Login/Login';
import PageNotFound from './../Components/PageNotFound/PageNotFound';
import NotAuthorized from './../Components/NotAuthorized/NotAuthorized';
import Wrapper from './../Components/Wrapper/Wrapper';

export default class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/*<Wrapper/>*/}
                <Router history={createBrowserHistory()} >
                    <Route path="/" component={Wrapper} >
                        {/*<Route path="/" component={Dashboard}/>*/}
                        <Route path="/project" component={Dashboard}/>
                        <Route path="/projects" component={Dashboard}/>
                        <Route path="/projectsManagement" authorizedRoles={['projectManager']} component={Dashboard}/>
                        <Route path="/accountsManagement" authorizedRoles={['admin','Project manager']} component={Accounts}/>
                        <Route path="/login" component={Login} authorizedRoles={['guest']} />
                        <Route path="/noAccess" component={NotAuthorized}/>
                        <Route path="*" component={PageNotFound}/>
                    </Route>
                </Router>
            </div>
        );
    }
}
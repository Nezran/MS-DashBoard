import React from 'react';
import {Router, Route, IndexRoute, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Dashboard from './../Components/Dashboard/Dashboard';
import Accounts from './../Components/Accounts/Accounts';
import Login from './../Components/Login/Login';
import PageNotFound from './../Components/PageNotFound/PageNotFound';
import NotAuthorized from './../Components/NotAuthorized/NotAuthorized';
import Wrapper from './../Components/Wrapper/Wrapper';

import {}  from 'material-ui/svg-icons/device/airplanemode-active';

export default class RouterComponent extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div>
                {/*<Wrapper/>*/}
                <Router history={createBrowserHistory()} >
                    <Route path="/" component={Wrapper}  >
                        {/*<Route path="/" component={Dashboard}/>*/}
                        <Route path="/project" component={Dashboard} name="Projet"/>
                        <Route path="/projects" component={Dashboard} name="Projets"/>
                        <Route path="/projectsManagement" authorizedRoles={['Project manager']} component={Dashboard} name="Gérer des projets "/>
                        <Route path="/accountsManagement" authorizedRoles={['admin','Project manager']} component={Accounts} name="Gérer les comptes"/>
                        <Route path="/login" component={Login} authorizedRoles={['guest']} handler={this.handleLogged} name="Se connecter" />
                        <Route path="/noAccess" component={NotAuthorized}/>
                        <Route path="*" component={PageNotFound}/>
                    </Route>
                </Router>
            </div>
        );
    }
}
//////////////////////////////////////
// Authorize component
// Check if the connected user has the rights to access the ressource
/////////////////////////////////////

import React, {PropTypes} from 'react';
import _ from 'lodash';

class AuthorizeComponent extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    // if route role ask is egal to user role from localstorage
    authorizeBool = (routeRoles) => {
        return _.indexOf(routeRoles, localStorage.getItem("role")) === -1
    };

    // return the authorized roles
    routeRoles = (routes) => {
        const routeRoles = _.chain(routes)
            .filter(item => item.authorizedRoles) // access to custom attribute
            .map(item => item.authorizedRoles)
            .flattenDeep()
            .value();
        return routeRoles;
    };



    componentWillMount() {
        const {routes} = this.props; // array of routes
        const {router} = this.context;

        // check if User data available
        const token = localStorage.getItem('token');

        // if it's protected route
        if (this.routeRoles(routes)) {

            // if user is not logged -> set guest role and then redirect to login
            if (!token) {
                localStorage.setItem("role", "guest");
                router.push('/login');
            }

            // if no acces redirect to noAccess
            if (this.authorizeBool(this.routeRoles(routes))) {
                router.push('/noAccess');
            }
        }
    }
}

export default AuthorizeComponent;
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

    GoToHome = () => {
        router.push("/");
    };

    logOut = () => {
        localStorage.clear();
    };

    authorizeBool = (routeRoles) => {
        return _.indexOf(routeRoles, localStorage.getItem("role")) === -1
    };

    routeRoles = (routes) => {
        const routeRoles = _.chain(routes)
            .filter(item => item.authorizedRoles) // access to custom attribute
            .map(item => item.authorizedRoles)
            .flattenDeep()
            .value();
        return routeRoles;
    };

    routesAuthorize = () => {

    };

    componentWillMount() {
        const {routes} = this.props; // array of routes
        const {router} = this.context;

        // check if User data available
        const token = localStorage.getItem('token');

        if (this.routeRoles(routes)) {

            if (!token) {
                // redirect to login if not
                localStorage.setItem("role", "guest");

                router.push('/login');
            }

            if (this.authorizeBool(this.routeRoles(routes))) {
                router.push('/noAccess');
            }
        }
    }
}

export default AuthorizeComponent;
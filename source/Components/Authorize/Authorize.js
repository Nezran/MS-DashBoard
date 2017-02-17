import React, { PropTypes } from 'react';
import _ from 'lodash';

class AuthorizeComponent extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount() {
        const { routes } = this.props; // array of routes
        const { router } = this.context;

        // check if user data available
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            // redirect to login if not
            router.push('/login');
        }

        // get all roles available for this route
        const routeRoles = _.chain(routes)
            .filter(item => item.authorizedRoles) // access to custom attribute
            .map(item => item.authorizedRoles)
            .flattenDeep()
            .value();

        // compare routes with user data
        //a changer par comparer user.role avec les routesRoles
        // if (_.intersection(routeRoles, user.roles).length === 0) {
        //     router.push('/not-authorized');
        // }
    }
}

export default AuthorizeComponent;
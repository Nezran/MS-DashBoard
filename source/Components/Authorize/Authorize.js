import React, { PropTypes } from 'react';
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

    logOut = () =>{
        localStorage.clear();
    }

    componentWillMount() {
        const { routes } = this.props; // array of routes
        const { router } = this.context;

        //console.dir(routes);


        // check if User data available
        const token = localStorage.getItem('token');



        // if(routes[0].path == "login" && token){
        //     router.push('/');
        // }

        //console.log(routes[0].path,router);

        // get all roles available for this route
        const routeRoles = _.chain(routes)
            .filter(item => item.authorizedRoles) // access to custom attribute
            .map(item => item.authorizedRoles)
            .flattenDeep()
            .value();

        // const isGuest  = _.chain(routes)
        //     .filter(item => item.guest) // access to custom attribute
        //     .flattenDeep()
        //     .value();

        //console.log("ios",isGuest[0].guest);
        console.log(routeRoles);

        if(routeRoles){

            if (!token) {
                // redirect to login if not
                localStorage.setItem("role","guest");
                router.push('/login');
            }

            if(_.indexOf(routeRoles, localStorage.getItem("role")) === -1) {
                router.push('/noAccess');
            }

        }

        // if (!token) {
        //     // redirect to login if not
        //     localStorage.setItem("role","guest");
        //     router.push('/login');
        // } else if(routeRoles){
        //     if(_.indexOf(routeRoles, localStorage.getItem("role")) === -1) {
        //         router.push('/noAccess');
        //         console.log("false");
        //     }
        // } else{
        //     console.log("true");
        // }


        //console.log(routeRoles);
        // compare routes with User data
        //a changer par comparer User.role avec les routesRoles


    }
}

export default AuthorizeComponent;
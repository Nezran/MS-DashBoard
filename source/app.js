// Index du projet
//
import React from 'react';
import ReactDOM from 'react-dom';
import RouterComponent from './RouterComponent/RouterComponent';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* Material */
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fade} from 'material-ui/utils/colorManipulator';

import {
    green500, cyan700,
    brown500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack, purple50,
    lightBlueA700, lightBlue50
} from 'material-ui/styles/colors';

// style du template purple50
const App = function () {
    const muiTheme = getMuiTheme({
        fontFamily: 'Roboto, sans-serif',
        borderRadius: 2,
        palette: {
            primary1Color: '#9b59b6',
            primary2Color: cyan700,
            primary3Color: grey400,
            accent1Color: '#9b59b6',
            accent2Color: grey100,
            accent3Color: grey500,
            textColor: darkBlack,
            secondaryTextColor: fade(darkBlack, 0.54),
            alternateTextColor: white,
            canvasColor: white,
            borderColor: grey300,
            disabledColor: fade('#9b59b6', 1),
            pickerHeaderColor: purple50,
            clockCircleColor: fade(darkBlack, 0.07),
            shadowColor: fullBlack,
            floatingLabelStyle: '#9b59b6',
            textField:{floatingLabelStyle:'#9b59b6'}
        },
    });


    // Point d'entrée de l'application, on passe le router dans le template
    return (
        <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <RouterComponent/>
            </MuiThemeProvider>
        </div>
    );
};

// On render l'app
ReactDOM.render(<App />, document.getElementById('app'));
import React from 'react';
import ReactDOM from 'react-dom';
import RouterComponent from './RouterComponent/RouterComponent';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* Material */
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    green500, cyan700,
    brown500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
    lightBlueA700, lightBlue50
} from 'material-ui/styles/colors';

const App = function () {
    const muiTheme = getMuiTheme({
        palette: {
            primary1Color: lightBlueA700,
            primary2Color: cyan700,
            primary3Color: grey400,
            accent1Color: lightBlueA700,
            accent2Color: grey500,
            accent3Color: grey500,
            textColor: darkBlack,
            alternateTextColor: white,
            canvasColor: white,
            borderColor: grey300,
            pickerHeaderColor: lightBlueA700,
            shadowColor: fullBlack,
        },
    });

    return (
        <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <RouterComponent/>
            </MuiThemeProvider>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
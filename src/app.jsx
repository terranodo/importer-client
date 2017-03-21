import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ImporterLink from './components/importerLink'
import configureStore from './configureStore';

import {setServerUrl} from './state/server/actions';

const store = configureStore();
store.dispatch(setServerUrl('http://importer.terranodo.io/'));


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#eb6b00",
    primary2Color: "#eb6b00",
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
		<Provider store={store}>
			<ImporterLink/>
		</Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

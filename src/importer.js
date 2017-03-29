import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ImporterLink from './components/importerLink'
import configureStore from './configureStore';

import {setServerUrl} from './state/server/actions';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "#eb6b00"
  }
});

const store = configureStore();

class Importer {
  constructor(domId, options) {
    this._domId = domId;
		this._server = options.server;
  }
	set server(value) {
    this._server = value;
  }
  view() {
		store.dispatch(setServerUrl(this._server));
		ReactDOM.render(
			<MuiThemeProvider muiTheme={muiTheme}>
				<Provider store={store}>
					<ImporterLink/>
				</Provider>
			</MuiThemeProvider>,
			document.getElementById(this._domId)
		);
  }
}

module.exports = Importer;

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ImporterLink from './components/importerLink'
import configureStore from './configureStore';

import {setServerUrl} from './state/server/actions';

const store = configureStore();
store.dispatch(setServerUrl('http://importer.terranodo.io/'));
ReactDOM.render(<Provider store={store}><ImporterLink /></Provider>, document.getElementById('main'));

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Importer from './importer.jsx'
import configureStore from './configureStore.js';

import {setServerUrl} from './state/server/actions';

const store = configureStore();
store.dispatch(setServerUrl('http://importer.terranodo.io/'));
ReactDOM.render(<Provider store={store}><Importer/></Provider>, document.getElementById('main'));

import {should} from 'chai';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
should();

import ReactTestUtils from 'react-addons-test-utils';

import Importer from '../src/importer.jsx';

const mockStore = configureMockStore();
const store = mockStore();

describe('Importer', () => {
	it('exists', () => {
    const importerComponent = ReactTestUtils.renderIntoDocument(<Provider store={store}><Importer /></Provider>);
    ReactTestUtils.isCompositeComponent(importerComponent).should.be.true;
	});
});

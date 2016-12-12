import {should} from 'chai';
should();

import ReactTestUtils from 'react-addons-test-utils';

import Importer from '../src/importer.jsx';


describe('Importer', () => {
	it('exists', () => {
    const importerComponent = ReactTestUtils.renderIntoDocument(<Importer />);
    ReactTestUtils.isCompositeComponent(importerComponent).should.be.true;
	});
});

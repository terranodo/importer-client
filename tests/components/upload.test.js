import ReactTestUtils from 'react-addons-test-utils';

import Upload from '../../src/components/upload';


describe('Upload', () => {
	it('exists', () => {
    const uploadComponent = ReactTestUtils.renderIntoDocument(<Upload />);
    ReactTestUtils.isCompositeComponent(uploadComponent).should.be.true;
	});
});

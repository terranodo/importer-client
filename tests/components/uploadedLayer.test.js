import ReactTestUtils from 'react-addons-test-utils';

import UploadedLayer from '../../src/components/uploadedLayer';


describe('UploadedLayer', () => {
	it('exists', () => {
    const layer = { name: 'Test', import_status: ''};
    const uploadComponent = ReactTestUtils.renderIntoDocument(<UploadedLayer layer={layer}/>);
    ReactTestUtils.isCompositeComponent(uploadComponent).should.be.true;
	});
});

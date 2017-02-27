import ReactTestUtils from 'react-addons-test-utils';

import UploadedData from '../../src/components/uploadedData';


describe('UploadedData', () => {
	it('exists', () => {
    const data = { layers: [] };
    const uploadComponent = ReactTestUtils.renderIntoDocument(<UploadedData data={data}/>);
    ReactTestUtils.isCompositeComponent(uploadComponent).should.be.true;
	});
});

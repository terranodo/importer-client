import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import UploadedLayer from '../../src/components/uploadedLayer';
import {Card} from 'material-ui/Card';


describe('UploadedLayer', () => {
	it('exists', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<UploadedLayer layer={layer}/>);
    expect(wrapper.find(Card)).to.have.length(1);
	});
});

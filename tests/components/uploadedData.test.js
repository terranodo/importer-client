import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import td from 'testdouble';
var tdChai = require("testdouble-chai");
chai.use(tdChai(td));

import UploadedData from '../../src/components/uploadedData';
import UploadedLayer from '../../src/components/uploadedLayer';


describe('UploadedData', () => {
	it('renders one <UploadedLayer /> component', () => {
    const data = { layers: [{name: 'Test'}] };
    const wrapper = shallow(<UploadedData data={data}/>);
    expect(wrapper.find(UploadedLayer)).to.have.length(1);
	});
	it('handles click', () => {
    const data = { layers: [{name: 'Test'}] };
    let importAll = td.function();
    const wrapper = shallow(<UploadedData importAll={importAll} data={data}/>);
    wrapper.find('button').simulate('click');
    expect(importAll).to.have.been.called;
	});
});

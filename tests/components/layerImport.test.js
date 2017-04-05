import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import LayerImport from '../../src/components/layerImport';
import {Wizard} from '../../src/components/step';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


describe('LayerImport', () => {
	it('exists', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport layer={layer}/>);
    expect(wrapper.find(Dialog)).to.have.length(1);
    console.log(wrapper.find(Dialog).children)
	});
	it('shows the correct content', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport layer={layer}/>);
    expect(wrapper.state('steps')).to.equal(3);
	});
	it('shows the layer name field', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport layer={layer}/>);
    expect(wrapper.find(Dialog).childAt(0).childAt(0).hasClass('step-1')).to.equal(true);
	});
	it('has the correct state', () => {
    const layer = { layerName: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport layer={layer}/>);
    expect(wrapper.state('layerName')).to.equal('Test');
	});
});

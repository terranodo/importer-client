import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import { Step } from 'material-ui/Stepper';
import Wizard from '../../src/components/step';


describe('Wizard', () => {
	it('exists', () => {
    const wrapper = shallow(<Wizard step={1}/>);
    expect(wrapper.find(Step)).to.have.length(3);
	});
});

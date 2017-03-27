import {should} from 'chai';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
should();

import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import Importer from '../src/components/importer';
import Step from '../src/components/step';
import UploaderLink from '../src/components/uploadLink';

const mockStore = configureMockStore();
const store = mockStore();

describe('Importer', () => {
	it('renders one <Step /> component', () => {
    const wrapper = shallow(<Importer />);
    expect(wrapper.find(Step)).to.have.length(1);
	});
	it('renders one <UploaderLink /> component', () => {
    const wrapper = shallow(<Importer />);
    expect(wrapper.find(UploaderLink)).to.have.length(1);
	});
	it('step state is 1', () => {
    const wrapper = shallow(<Importer />);
    expect(wrapper.state('step')).to.equal(1);
	});
  describe('step 2', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Importer />);
      wrapper.setState({ step: 2});
    });
    it('does not renders <UploaderLink /> component', () => {
      expect(wrapper.find(UploaderLink)).to.have.length(0);
    });
  });
});

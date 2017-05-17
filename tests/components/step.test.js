import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import { Step } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import Wizard from '../../src/components/step';

import td from 'testdouble';

describe('Wizard', () => {
	it('exists', () => {
    const wrapper = shallow(<Wizard step={1}/>);
    expect(wrapper.find(Step)).to.have.length(3);
	});
  describe('do not show buttons', () => {
    it('should habe no buttons', () => {
      const wrapper = shallow(<Wizard step={1} steps={2} showButtons={false}/>);
      expect(wrapper.find(RaisedButton)).to.have.length(0);
    });
	});
  describe('step < steps', () => {
    it('should habe next button', () => {
      const wrapper = shallow(<Wizard step={1} steps={2}/>);
      expect(wrapper.find(RaisedButton)).to.have.length(1);
    });
    it('should call next prop function', () => {
      let next = td.function();
      const wrapper = shallow(<Wizard step={1} steps={2} next={next}/>);
      wrapper.find(RaisedButton).simulate('click')
      expect(next).to.have.been.called;
    });
    describe('step > 1', () => {
      it('should habe both buttons', () => {
        const wrapper = shallow(<Wizard step={2} steps={3}/>);
        expect(wrapper.find(RaisedButton)).to.have.length(2);
      });
    });
  });
  describe('step = steps && step > 1', () => {
    it('should habe previous button', () => {
      const wrapper = shallow(<Wizard step={2} steps={2}/>);
      expect(wrapper.find(RaisedButton)).to.have.length(1);
    });
    it('should call next prop function', () => {
      let prev = td.function();
      const wrapper = shallow(<Wizard step={2} steps={2} prev={prev}/>);
      wrapper.find(RaisedButton).simulate('click')
      expect(prev).to.have.been.called;
    });
  });
});

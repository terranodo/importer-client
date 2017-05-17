import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import Upload from '../../src/components/upload';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';


describe('Upload', () => {
	it('shows the dropzone', () => {
    const wrapper = shallow(<Upload />);
    expect(wrapper.find(Dropzone)).to.have.length(1);
	});
  it('showProgress is false', () => {
    const wrapper = shallow(<Upload />);
    expect(wrapper.state('showProgress')).to.equal(false);
  });
  describe('upload failed', () => {
    it('set the state of showProgress to false', () => {
      const wrapper = shallow(<Upload />);
      wrapper.setProps({uploads: { status: 'FAILED'}});
      expect(wrapper.state('showProgress')).to.equal(false);
    });
    it('set the state for text', () => {
      const wrapper = shallow(<Upload />);
      wrapper.setProps({uploads: { status: 'FAILED'}});
      expect(wrapper.state('text')).to.equal('Upload Failed');
    });
  });
  describe('upload succeeds', () => {
    it('does not change state for text', () => {
      const wrapper = shallow(<Upload />);
      wrapper.setProps({uploads: { status: 'UPLOADED'}});
      expect(wrapper.state('text')).to.equal('Drop a file here or click to open upload window.');
    });
  });
  describe('showProgress is true', () => {
    it('shows circularprogress', () => {
      const wrapper = shallow(<Upload />);
      wrapper.setState({showProgress: true});
      expect(wrapper.find(CircularProgress)).to.have.length(1);
    });
  });
});

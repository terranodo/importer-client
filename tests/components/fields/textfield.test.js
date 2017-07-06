import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import TextField from '../../../src/components/fields/textfield';

import MuiTextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import td from 'testdouble';

describe('TextField', () => {
  let defaultConfig, layerName;
	it('exists', () => {
    const wrapper = shallow(<TextField />);
    expect(wrapper.find(MuiTextField)).to.have.length(1);
	});
	it('shows the correct content', () => {
    const wrapper = shallow(<TextField />);
    expect(wrapper.state('loading')).to.equal(true);
	});
	it('calls the callback', () => {
    let change = td.function();
    const wrapper = shallow(<TextField callback={change}/>)
    wrapper.find(MuiTextField).simulate('change');
    expect(change).to.have.been.called;
	});
	it('needs a promise for value and is resolved in componentDidMount', () => {
    let muiTheme = getMuiTheme();
    let value = Promise.resolve(['a','b'])
    const wrapper = mount(<TextField value={value}/>,{
          context: {muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object}
      });
    expect(TextField.prototype.componentDidMount).to.have.been.calledOnce;
	});
});

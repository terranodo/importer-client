import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import Select from '../../../src/components/fields/select';

import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import td from 'testdouble';



describe('Select', () => {
  let defaultConfig, layerName;
	it('exists', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper.find(SelectField)).to.have.length(1);
	});
	it('shows the correct content', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper.state('loading')).to.equal(true);
	});
	it('expects an promise for items', (done) => {
    let muiTheme = getMuiTheme();
    let items = Promise.resolve(['a','b'])
    const wrapper = mount(<Select items={items}/>,{
          context: {muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object}
      });
    console.log(wrapper.html())
    expect(wrapper.find(MenuItem)).to.have.length(1);
    done();
	});
});

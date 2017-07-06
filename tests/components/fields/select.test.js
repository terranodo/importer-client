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
		it('creates the menuitems for state value', () => {
    const wrapper = shallow(<Select/>);
    wrapper.setState({items: ['Test']});
    expect(wrapper.find(MenuItem)).to.have.length(1);
	});
	it('calls the callback', () => {
    let change = td.function();
    const wrapper = shallow(<Select callback={change}/>)
    wrapper.find(SelectField).simulate('change');
    expect(change).to.have.been.called;
	});
	it('needs a promise for items and is resolved in componentDidMount', () => {
    let muiTheme = getMuiTheme();
    let items = Promise.resolve(['a','b'])
    const wrapper = mount(<Select items={items}/>,{
          context: {muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object}
      });
    expect(Select.prototype.componentDidMount).to.have.been.calledOnce;
	});
  describe('currentValue', () => {
    describe('props value set', () => {
      it('should be equal value', () => {
        const wrapper = shallow(<Select value={"Test"}/>);
        expect(wrapper.state('currentValue')).to.equal("Test");
      });
      describe('multiple', () => {
        it('should be equal value', () => {
          const wrapper = shallow(<Select multiple={true} value={["Test"]}/>);
          expect(wrapper.state('currentValue')).to.deep.equal(["Test"]);
        });
      });
    });
    describe('props value not set', () => {
      it('should be null', () => {
        const wrapper = shallow(<Select/>);
        expect(wrapper.state('currentValue')).to.equal(null);
      });
      describe('multiple', () => {
        it('should be empty array', () => {
          const wrapper = shallow(<Select multiple={true} />);
          expect(wrapper.state('currentValue')).to.deep.equal([]);
        });
      });
    });
  });
});

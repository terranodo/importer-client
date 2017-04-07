import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import LayerImport from '../../src/components/layerImport';
import {Wizard} from '../../src/components/step';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import td from 'testdouble';


describe('LayerImport', () => {
  let defaultConfig;
  beforeEach(() => {
    defaultConfig = {
      edit_name: true,
      edit_time: false,
      other: [{
        title: 'GeoGig',
        api_name: 'geogig',
        type: 'text'
      }]
    };
  });
	it('exists', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
    expect(wrapper.find(Dialog)).to.have.length(1);
	});
	it('shows the correct content', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
    expect(wrapper.state('steps')).to.equal(3);
	});
	it('shows the layer name field', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
    expect(wrapper.find(Dialog).childAt(0).childAt(0).hasClass('step-1')).to.equal(true);
	});
	it('has the correct state', () => {
    const layer = { layerName: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
    expect(wrapper.state('layerName')).to.equal('Test');
	});
  it('shows select field correctly', () => {
    const config = Object.assign({}, defaultConfig, {edit_time: true});
    const layer = { layerName: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={config} layer={layer}/>);
    wrapper.setState({step: 3});
    expect(wrapper.find(SelectField)).to.have.length(1);
  });
  it('import is called', () => {
    let config = {
      edit_name: true,
      edit_time: false,
      other: []
    }
    const layer = { layerName: 'Test', import_status: ''};
    const configureLayer = td.function();
    const muiTheme = getMuiTheme();
    const uploads = { importLayers: { started: false, single: {}}};
    const root = document.createElement("div");
    document.body.appendChild(root);
    const wrapper = mount(<LayerImport uploads={uploads} configureLayerWithConfig={configureLayer} config={config} layer={layer}/>,{
        context: {muiTheme},
        childContextTypes: {muiTheme: React.PropTypes.object},
        attachTo: root
    });
    wrapper.setState({step: 2, show: true});
    const confirm = document.body.querySelector(".import-btn button");
    ReactTestUtils.Simulate.click(confirm);
    expect(configureLayer).to.have.been.called;
  });
});

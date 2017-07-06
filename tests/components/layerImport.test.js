import ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';

import LayerImport from '../../src/components/layerImport';
import {Wizard} from '../../src/components/step';
import Select from '../../src/components/fields/select';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import td from 'testdouble';

describe('LayerImport', () => {
  let defaultConfig, layerName;
  beforeEach(() => {
    defaultConfig = ["layerName"]
  });
	it('exists', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
    expect(wrapper.find(Dialog)).to.have.length(1);
	});
	it('shows the correct content', () => {
    const layer = { name: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
    expect(wrapper.state('steps')).to.equal(2);
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
  it('shows select field for second step', () => {
    const config = ["layerName","dateTime"];
    const layer = { layerName: 'Test', import_status: ''};
    const wrapper = shallow(<LayerImport config={config} layer={layer}/>);
    wrapper.setState({step: 2});
    expect(wrapper.find(Select)).to.have.length(2);
  });
  describe('import', () => {
    let layer, configureLayer, muiTheme, uploads, root;
    beforeEach( () => {
      layer = { layerName: 'Test', import_status: ''};
      configureLayer = td.function();
      muiTheme = getMuiTheme();
      uploads = { importLayers: { started: false, single: {}}};
      root = document.createElement("div");
      document.body.appendChild(root);
    });
    afterEach( () => {
      document.body.removeChild(root);
    });
    it('import is called', () => {
      const wrapper = mount(<LayerImport uploads={uploads} configureLayerWithConfig={configureLayer} config={defaultConfig} layer={layer}/>,{
          context: {muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
          attachTo: root
      });
      wrapper.setState({step: 2, show: true});
      const confirm = document.body.querySelector(".import-btn button");
      ReactTestUtils.Simulate.click(confirm);
      expect(configureLayer).to.have.been.called;
      wrapper.detach();
    });
    it('import is called with the corect config', () => {
      const result = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layerName: 'Test'};
      const wrapper = mount(<LayerImport id={1} uploads={uploads} configureLayerWithConfig={configureLayer} config={defaultConfig} layer={layer}/>,{
          context: {muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
          attachTo: root
      });
      wrapper.setState({step: 2, show: true});
      const confirm = document.body.querySelector(".import-btn button");
      ReactTestUtils.Simulate.click(confirm);
      expect(configureLayer).to.have.been.calledWith(result, 1);
      wrapper.detach();
    });
  });
  describe('#componentWillReceiveProps', () => {
    it('sets importing state', () => {
      const layer = { name: 'Test', import_status: ''};
      const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
      wrapper.setProps({id: 1, uploads: {importLayers: { single: []}}});
      expect(wrapper.state('importing')).to.equal(false);
    });
    describe('layer is imported', () => {
      let props;
      beforeEach(() => {
        props = {id: 0, uploads: {importLayers: { single: [{success: true, started: true}]}}};
      });
      it('sets importing state', () => {
        const layer = { name: 'Test', import_status: ''};
        const wrapper = shallow(<LayerImport config={defaultConfig} layer={layer}/>);
        wrapper.setProps(props);
        expect(wrapper.state('importing')).to.equal(true);
      });
    });
  });
});

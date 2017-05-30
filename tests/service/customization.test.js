import td from 'testdouble';
import dateTime from '../../src/customization/datetime';
import layerName from '../../src/customization/layername';
import geogig from '../../src/customization/geogig';
import {getDefaultCustomization, importLayerConfig, convertConfigToSteps, __RewireAPI__ as actionsRewireAPI} from '../../src/services/customization';

describe('customization', () => {
  let defaultcustomization;
  beforeEach( () => {
    defaultcustomization = ["layerName"]
  });
  describe('#defaultcustomization', () => {
    it('returns result', () => {
      return expect(getDefaultCustomization()).to.deep.equal(defaultcustomization);
    });
  });
  describe('#convertConfigToSteps', () => {
    it('steps', () => {
      let configSpy = td.function();
      let configSpyStep = td.function();
      td.when(configSpy()).thenReturn(configSpyStep);
      let layer = {layerName: 'Test'};
      convertConfigToSteps([configSpy], layer);
      return expect(configSpyStep).to.have.been.called;
    });
    describe('defaults', () => {
      afterEach(() => {
        actionsRewireAPI.__ResetDependency__('configDefaults');
      });
      it('steps', () => {
        let defaultSpy = td.function();
        let defaultSpyStep = td.function();
        td.when(defaultSpy()).thenReturn(defaultSpyStep);
        actionsRewireAPI.__Rewire__('customizationDefaults', {"layerName": defaultSpy});
        let layer = {layerName: 'Test'};
        convertConfigToSteps(["layerName"], layer);
        return expect(defaultSpyStep).to.have.been.called;
        });
    })
  });
  describe('#importLayerConfig', () => {
    it('returns the bare minimum with just a new name', () => {
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layerName: 'Padres'}
      let values = { layerName: 'Padres'};
      let layer = {layerName: 'Test'};
      let options = {};
      let step = layerName();
      step(layer, options)
      let steps = [step];
      return expect(importLayerConfig(steps, values)).to.deep.equal(layerConfig);
    });
  });
      //let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: true, convert_to_date: ['date'], editable: true, start_date: 'date', end_date: null, layer_name: name}
      //let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, geoserver_store: {type: 'geogig'}, start_date: null, end_date: null, layer_name: name}
      // let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: false, start_date: null, end_date: null, layer_name: name}
      //let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: null}
});

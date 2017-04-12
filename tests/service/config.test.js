import {getDefaultConfig, generateConfigArray, generateTitleArray, createLayerConfigFromConfigArray} from '../../src/services/config';

describe('config', () => {
  let defaultConfig;
  beforeEach( () => {
    defaultConfig = {
      steps: {
        1: {
          title: 'Layer Name',
          fields: [
            { title: '', api_name: 'layer_name', type: 'text'}
          ]
        }
      }
    }
  });
  describe('#defaultConfig', () => {
    it('returns result', () => {
      return assert.deepEqual(getDefaultConfig(), defaultConfig);
    });
  });
  describe('#createLayerConfigFromConfigArray', () => {
    it('returns the bare minimum with just a new name', () => {
      let values = { layer_name: 'Padres'};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: name}
      return assert.deepEqual(createLayerConfigFromConfigArray(defaultConfig, values), layerConfig);
    });
  });
  describe('time enabled', () => {
    beforeEach( () => {
      defaultConfig = {
        steps: {
          1: {
            title: 'Layer Name',
            fields: [
              { title: '', api_name: 'layer_name', type: 'text'}
            ]
          },
          2: { title: 'Dates', fields: [
            {title: 'Start Date', api_name: 'start_date', type: 'fields'},
            {title: 'End Date', api_name: 'end_date', type: 'fields'},
            {title: '', api_name: 'configureTime', type: 'hidden', value: true, parent: 'start_date'},
            {title: '', api_name: 'convert_to_date', type: 'hidden', value: (d) => { return [d.start_date]}, parent: 'start_date'}
          ]}
        }
      }
    });
    it('returns the config with time enabled', () => {
      let values = { layer_name: 'Padres', start_date: 'date'};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: true, convert_to_date: ['date'], editable: true, start_date: 'date', end_date: null, layer_name: name}
      return assert.deepEqual(createLayerConfigFromConfigArray(defaultConfig, values), layerConfig);
    });
  });
  describe('geogig enabled', () => {
    beforeEach( () => {
      defaultConfig = {
        steps: {
          1: {
            title: 'Layer Name',
            fields: [
              { title: '', api_name: 'layer_name', type: 'text'}
            ]
          },
          2: {
            title: 'Version Control',
            fields: [
              {title: '', api_name: 'editable', type: 'switch', values: [true, false]},
              {title: '', api_name: 'geoserver_store', type: 'hidden', value: {'type': 'geogig'}, parent: 'editable'}
            ]
          }
        }
      }
    });
    it('returns the config with geogig enabled', () => {
      let values = { layer_name: 'Padres', editable: true};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, geoserver_store: {type: 'geogig'}, start_date: null, end_date: null, layer_name: name}
      return assert.deepEqual(createLayerConfigFromConfigArray(defaultConfig, values), layerConfig);
    });
    it('returns the config no geogig', () => {
      let values = { layer_name: 'Padres', editable: false};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: false, start_date: null, end_date: null, layer_name: name}
      return assert.deepEqual(createLayerConfigFromConfigArray(defaultConfig, values), layerConfig);
    });
  });
  describe('hidden', () => {
    beforeEach( () => {
      defaultConfig = {
        steps: {
          1: {
            title: 'Layer Name',
            fields: [
              { title: '', api_name: 'layer_name', type: 'text'},
              { title: '', api_name: 'no_parent', type: 'hidden', value: 'yes'}
            ]
          }
        }
      }
    });
    it('has no parent requirement, set the value no_parent', () => {
      let values = { layer_name: 'Padres'};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: name, no_parent: 'yes'}
      return assert.deepEqual(createLayerConfigFromConfigArray(defaultConfig, values), layerConfig);
    });
    it('does not set the second value if parent is not set', () => {
      defaultConfig = {
        steps: {
          1: {
            title: 'Layer Name',
            fields: [
              { title: '', api_name: 'layer_name', type: 'text'},
              { title: '', api_name: 'parent', type: 'hidden', value: 'yes', parent: 'layer_name'}
            ]
          }
        }
      }
      let values = {};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: null}
      return assert.deepEqual(createLayerConfigFromConfigArray(defaultConfig, values), layerConfig);
    });
  });
})

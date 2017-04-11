import {getDefaultConfig, generateConfigArray, generateTitleArray, createLayerConfigFromConfigArray} from '../../src/services/config';

describe('config', () => {
  let defaultConfig;
  beforeEach( () => {
    defaultConfig = {
      steps: {
        1: {
          title: 'Layer Name',
          steps: [
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
})

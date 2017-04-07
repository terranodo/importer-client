import {getDefaultConfig, generateConfigArray, generateTitleArray, createLayerConfigFromConfigArray} from '../../src/services/config';

describe('config', () => {
  let defaultConfig;
  beforeEach( () => {
    defaultConfig = {
      edit_name: true,
      edit_time: false,
      other: []
    }
  });
  describe('#defaultConfig', () => {
    it('returns result', () => {
      return assert.deepEqual(getDefaultConfig(), defaultConfig);
    });
  });
  describe('#generateConfigArray', () => {
    it('returns correct number of objects', () => {
      return assert.equal(generateConfigArray(defaultConfig).length, 1);
    });
    it('layerName is the first item', () => {
      let layerName = {title: 'Layer Name', api_name: 'layerName', type: 'text'}
      return assert.deepEqual(generateConfigArray(defaultConfig)[0], layerName);
    });
    describe('include time config', () => {
      let config;
      beforeEach( () => {
        config = Object.assign(defaultConfig, {edit_time: true})
      })
      it('returns correct number of objects', () => {
        return assert.equal(generateConfigArray(config).length, 3);
      });
      it('Start Date is the first item', () => {
        let startDate = {title: 'Start Date', api_name: 'start_date', type: 'fields'};
        return assert.deepEqual(generateConfigArray(config)[1], startDate);
      });
    });
  });
  describe('#generateTitleArray', () => {
    let configArray;
    beforeEach( () => {
      configArray = [{title: 'Padres'}];
    })
    it('returns correct number of objects', () => {
      return assert.equal(generateTitleArray(configArray).length, 1);
    });
    it('first element is the title', () => {
      return assert.equal(generateTitleArray(configArray)[0], 'Padres');
    });
  });
  describe('#createLayerConfigFromConfigArray', () => {
    it('returns the bare minimum with just a new name', () => {
      let configArray = [{title: 'Layer Name', api_name: 'layer_name'}];
      let values = { layer_name: 'Padres'};
      let name = 'Padres';
      let layerConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: name}
      return assert.deepEqual(createLayerConfigFromConfigArray(configArray, values), layerConfig);
    });
  });
})

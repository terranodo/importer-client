import { mount } from 'enzyme';

import {Provider} from 'react-redux';
import LayerImportLink from '../../src/components/layerImportLink';
import uploads from '../../src/state/uploads/reducers'
import server from '../../src/state/server/reducers'
import layerImportConfig from '../../src/state/layerimportconfig/reducers'
import {createStore, combineReducers} from 'redux';
import { shallowWithStore } from 'enzyme-redux';
import td from 'testdouble';


describe('UploadLink', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads, server, layerImportConfig}));
  });
  describe('store states are props', () => {
    it('default server url is undefined', () => {
      const wrapper = shallowWithStore(<LayerImportLink/>,store);
      expect(wrapper.prop('server')).to.deep.equal({url: undefined});
    });
    it('default config is layerImportConfig', () => {
      const wrapper = shallowWithStore(<LayerImportLink/>,store);
      expect(wrapper.prop('config')).to.deep.equal(['layerName']);
    });
    it('default uploads', () => {
      const defaultState = {
        id: undefined,
        status: '',
        count: 0,
        success: false,
        files: undefined,
        data: undefined,
        importLayers: {
          started: false,
          single: {}
        }
      };
      const wrapper = shallowWithStore(<LayerImportLink />,store);
      expect(wrapper.prop('uploads')).to.deep.equal(defaultState);
    });
  });
});

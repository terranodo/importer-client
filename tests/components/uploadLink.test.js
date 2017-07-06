import { mount } from 'enzyme';

import {Provider} from 'react-redux';
import UploadLink from '../../src/components/uploadLink';
import uploads from '../../src/state/uploads/reducers'
import server from '../../src/state/server/reducers'
import {createStore, combineReducers} from 'redux';
import { createMockStore, createMockDispatch } from 'redux-test-utils';
import { shallowWithStore } from 'enzyme-redux';
import configureMockStore from 'redux-mock-store';
import thunk from'redux-thunk';
import td from 'testdouble';

import { __RewireAPI__ as actionsRewireAPI} from '../../src/state/uploads/actions';

describe('UploadLink', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads, server}));
  });
  afterEach(() => {
    actionsRewireAPI.__ResetDependency__('uploadFiles');
  });
  describe('store states are props', () => {
    it('default server url is undefined', () => {
      const wrapper = shallowWithStore(<UploadLink />,store);
      expect(wrapper.prop('server')).to.deep.equal({url: undefined});
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
      const wrapper = shallowWithStore(<UploadLink />,store);
      expect(wrapper.prop('uploads')).to.deep.equal(defaultState);
    });
  });
  describe('#uploadFiles', () => {
    it('has the appropriate action dispatched', () => {
      let apiResult = {status: '', id: 1, count: 1};
      actionsRewireAPI.__Rewire__('uploadFiles', () => {
        return Promise.resolve(apiResult);
      });
      const dispatch = td.function();
      const mockStore = createMockStore({server: {}, uploads: {}});
      const wrapper = shallowWithStore(<UploadLink />,mockStore);
      wrapper.props().uploadFiles([1]);
      let action = mockStore.getActions()[0];
      let result = action(dispatch, mockStore.getState);
      let actionResult = {
        type: 'UPLOAD_FILE_SUCCESS',
        result: apiResult
      };
      return result.then( () => {
        expect(dispatch).to.have.been.calledWith(actionResult);
      }).catch( (ex) => {
        expect(dispatch).to.have.been.calledWith(actionResult);
      });
    });
  });
});

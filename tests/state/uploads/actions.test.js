import configureMockStore from 'redux-mock-store';
import thunk from'redux-thunk';

import {getUploadId, upload, configureUploads, __RewireAPI__ as actionsRewireAPI} from '../../../src/state/uploads/actions';

import {GET_UPLOAD_ID, SET_UPLOAD_ID, GET_UPLOAD_STATUS, SET_UPLOAD_STATUS, GET_UPLOAD_COUNT, SET_UPLOAD_COUNT, UPLOAD_FILE_SUCCESS, CONFIGURE_SUCCESS} from '../../../src/state/actiontypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getUploadId', () => {
  it('creates an action for GET_UPLOAD_ID', () => {
    const expectedAction = {type: GET_UPLOAD_ID}
    assert.deepEqual(getUploadId(), expectedAction);
  });
});
describe('upload', () => {
  afterEach(() => {
    actionsRewireAPI.__ResetDependency__('uploadFiles');
  });
  it('calls UPLOAD_FILE_SUCCESS', () => {
    let result = {status: '', id: 1, count: 1};
    actionsRewireAPI.__Rewire__('uploadFiles', () => {
      return Promise.resolve(result);
    });
    const store = mockStore({server: { url: ''}});
    const expectedAction = [{type: UPLOAD_FILE_SUCCESS, result: result}];
    return store.dispatch(upload([])).then( () => {
      assert.deepEqual(store.getActions(), expectedAction);
    });
  });
});
describe('configure', () => {
  afterEach(() => {
    actionsRewireAPI.__ResetDependency__('configureUploads');
  });
  it('calls UPLOAD_FILE_SUCCESS', () => {
    let result = {status: '', id: 1, count: 1};
    actionsRewireAPI.__Rewire__('configure', () => {
      return Promise.resolve(result);
    });
    const store = mockStore({server: { url: ''}, uploads: { id: 1 }});
    const expectedAction = [{type: CONFIGURE_SUCCESS, result: result}];
    return store.dispatch(configureUploads()).then( () => {
      assert.deepEqual(store.getActions(), expectedAction);
    });
  });
});

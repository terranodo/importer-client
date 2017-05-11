import configureMockStore from 'redux-mock-store';
import thunk from'redux-thunk';

import {getUploadId, upload, configureUploads, getUploadedData, importAllLayers, importStarted, __RewireAPI__ as actionsRewireAPI} from '../../../src/state/uploads/actions';

import {GET_UPLOAD_ID, SET_UPLOAD_ID, GET_UPLOAD_STATUS, SET_UPLOAD_STATUS, GET_UPLOAD_COUNT, SET_UPLOAD_COUNT, UPLOAD_FILE_SUCCESS, CONFIGURE_SUCCESS, UPLOADED_DATA_SUCCESS, IMPORT_ALL_SUCCESS, IMPORT_ALL_STARTED, IMPORT_STARTED} from '../../../src/state/actiontypes';

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
describe('importStarted', () => {
  it('creates an action for IMPORT_STARTED', () => {
    const expectedAction = {type: IMPORT_STARTED, index: 1}
    assert.deepEqual(importStarted(1), expectedAction);
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
    const expectedAction = [{type: IMPORT_STARTED, index: 1}, {type: CONFIGURE_SUCCESS, index: 1, result: result}];
    return store.dispatch(configureUploads({},1)).then( () => {
      assert.deepEqual(store.getActions(), expectedAction);
    });
  });
});
describe('#getUploadedData', () => {
  afterEach(() => {
    actionsRewireAPI.__ResetDependency__('uploadedData');
  });
  it('calls UPLOAD_FILE_SUCCESS', () => {
    let result = {id: 1, complete: true};
    actionsRewireAPI.__Rewire__('uploadedData', () => {
      return Promise.resolve(result);
    });
    const store = mockStore({server: { url: ''}, uploads: { id: 1 }});
    const expectedAction = [{type: UPLOADED_DATA_SUCCESS, result: result}];
    return store.dispatch(getUploadedData()).then( () => {
      assert.deepEqual(store.getActions(), expectedAction);
    });
  });
});
describe('#importAllLayers', () => {
  afterEach(() => {
    actionsRewireAPI.__ResetDependency__('importAll');
  });
  it('calls IMPORT_ALL_SUCCESS', () => {
    let result = {id: 1, complete: true};
    actionsRewireAPI.__Rewire__('importAll', () => {
      return Promise.resolve(result);
    });
    actionsRewireAPI.__Rewire__('uploadedData', () => {
      return Promise.resolve(result);
    });
    const store = mockStore({server: { url: ''}, uploads: { id: 1 }});
    const expectedAction = [{type: IMPORT_ALL_STARTED, startImport: true},{type: IMPORT_ALL_SUCCESS, result: result},{type: UPLOADED_DATA_SUCCESS, result: result}];
    return store.dispatch(importAllLayers()).then( () => {
      assert.deepEqual(store.getActions(), expectedAction);
    });
  });
});

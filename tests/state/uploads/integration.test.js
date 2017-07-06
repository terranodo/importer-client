
import uploads from '../../../src/state/uploads/reducers'
import {uploadFileSuccess, uploadedDataSuccess, configureSuccess, importStarted} from '../../../src/state/uploads/actions'
import {uploadSuccess, getUploadData, isLayerImported, singleImportStarted} from '../../../src/state/uploads/selectors'

import {createStore, combineReducers} from 'redux';

describe('upload files', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads}));
    store.dispatch(uploadFileSuccess({state: 'UPLOADED'}));
  })
  describe('#uploadSuccess', () => {
    it('returns true', () => {
      expect(uploadSuccess(store.getState())).to.equal(true);
    })
  })
});
describe('get uploaded data', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads}));
    store.dispatch(uploadedDataSuccess({ id: 1, complete: true}));
  })
  describe('#uploadSuccess', () => {
    it('returns true', () => {
      expect(getUploadData(store.getState())).to.deep.equal({id: 1, complete: true});
    })
  })
});
describe('configure single layer', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads}));
    store.dispatch(configureSuccess({ token: '1234'},1));
  })
  describe('#isLayerImported', () => {
    it('returns true', () => {
      expect(isLayerImported(store.getState(),1)).to.equal(true);
    })
  })
});
describe('import single layer', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads}));
    store.dispatch(importStarted(1));
  })
  describe('#singleImportStarted', () => {
    it('returns true', () => {
      expect(singleImportStarted(store.getState(),1)).to.equal(true)
    })
  })
});

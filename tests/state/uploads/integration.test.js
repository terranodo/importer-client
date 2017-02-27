
import uploads from '../../../src/state/uploads/reducers'
import {uploadFileSuccess, uploadedDataSuccess} from '../../../src/state/uploads/actions'
import {uploadSuccess, getUploadData} from '../../../src/state/uploads/selectors'

import {createStore, combineReducers} from 'redux';

describe('upload files', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({uploads}));
    store.dispatch(uploadFileSuccess({state: 'UPLOADED'}));
  })
  describe('#uploadSuccess', () => {
    it('returns true', () => {
      assert.equal(uploadSuccess(store.getState()), true);
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
      assert.deepEqual(getUploadData(store.getState()), {id: 1, complete: true});
    })
  })
});

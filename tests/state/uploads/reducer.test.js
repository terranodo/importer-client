import uploads from '../../../src/state/uploads/reducers';

import {GET_UPLOAD_ID, SET_UPLOAD_ID, GET_UPLOAD_STATUS, SET_UPLOAD_STATUS, GET_UPLOAD_COUNT, SET_UPLOAD_COUNT, UPLOAD_FILE_SUCCESS, CONFIGURE_SUCCESS, UPLOADED_DATA_SUCCESS, IMPORT_ALL_SUCCESS, IMPORT_ALL_STARTED} from '../../../src/state/actiontypes';

describe('uploads', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      id: undefined,
      status: '',
      count: 0,
      success: false,
      files: undefined,
      data: undefined,
      import: {
        started: false
      }
    };
  });
  it('has initial state', () => {
    assert.deepEqual(uploads(undefined, {}), defaultState)
  });
  describe('SET_UPLOAD_ID', () => {
    it('sets the upload id in state', () => {
      let action = { type: SET_UPLOAD_ID, uploadId: 1};
      let state = Object.assign({}, defaultState, {id: 1});
      assert.deepEqual(uploads(undefined, action),state);
    });
  });
  describe('UPLOAD_FILE_SUCCESS', () => {
    it('sets the upload id, file count, success, status in state', () => {
      let result = { id: 1, state: 'working', count: 1};
      let action = { type: UPLOAD_FILE_SUCCESS, result};
      let state = Object.assign({}, defaultState, {id: 1, status: 'working', count: 1, success: true});
      assert.deepEqual(uploads(undefined, action),state);
    });
  });
  describe('CONFIGURE_SUCCESS', () => {
    it('sets the success state for each file', () => {
      let result = { id: 1, status: 'success', count: 1};
      let action = { type: CONFIGURE_SUCCESS, result};
      let state = Object.assign({}, defaultState, {id: 1, status: 'success', count: 1, success: true});
      assert.deepEqual(uploads(undefined, action),state);
    });
  });
  describe('UPLOADED_DATA_SUCCESS', () => {
    it('sets the returned uploaded file data', () => {
      let result = { id: 1, status: "UPLOADED" };
      let action = { type: UPLOADED_DATA_SUCCESS, result};
      let state = Object.assign({}, defaultState, {data: result});
      assert.deepEqual(uploads(undefined, action),state);
    });
  });
  describe('IMPORT_ALL_SUCCESS', () => {
    it('sets the returned uploaded file data', () => {
      let result = { id: 1, status: "UPLOADED" };
      let action = { type: IMPORT_ALL_SUCCESS, result};
      let state = Object.assign({}, defaultState, {import: { started: false}});
      assert.deepEqual(uploads(undefined, action),state);
    });
  });
  describe('IMPORT_ALL_STARTED', () => {
    it('sets the returned uploaded file data', () => {
      let result = { id: 1, status: "UPLOADED" };
      let action = { type: IMPORT_ALL_STARTED, result};
      let state = Object.assign({}, defaultState, {import: { started: true}});
      assert.deepEqual(uploads(undefined, action),state);
    });
  });
});

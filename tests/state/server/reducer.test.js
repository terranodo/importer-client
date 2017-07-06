import server from '../../../src/state/server/reducers';

import {GET_SERVER_URL, SET_SERVER_URL} from '../../../src/state/actiontypes';

describe('uploads', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      url: undefined
    };
  });
  it('has initial state', () => {
    expect(server(undefined, {})).to.deep.equal(defaultState)
  });
  describe('SET_UPLOAD_ID', () => {
    it('sets the upload id in state', () => {
      let action = { type: SET_SERVER_URL, url: 'test.url'};
      let state = Object.assign({}, defaultState, {url: 'test.url'});
      expect(server(undefined, action)).to.deep.equal(state);
    });
  });
  describe('GET_UPLOAD_ID', () => {
    it('gets the server url action', () => {
      let action = { type: GET_SERVER_URL };
      let state = Object.assign({}, defaultState, {url: 'test.url'});
      expect(server(state, action)).to.deep.equal('test.url');
    });
  });
});

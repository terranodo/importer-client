import configureMockStore from 'redux-mock-store';
import thunk from'redux-thunk';

import {getServerUrl, setServerUrl} from '../../../src/state/server/actions';

import {GET_SERVER_URL, SET_SERVER_URL} from '../../../src/state/actiontypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getServerUrl', () => {
  it('creates an action for GET_UPLOAD_ID', () => {
    const expectedAction = {type: GET_SERVER_URL}
    expect(getServerUrl()).to.deep.equal(expectedAction);
  });
});
describe('setServerId', () => {
  it('creates an action for SET_SERVER_URL', () => {
    const expectedAction = {type: SET_SERVER_URL, url: 'test.url'}
    expect(setServerUrl('test.url')).to.deep.equal(expectedAction);
  });
});

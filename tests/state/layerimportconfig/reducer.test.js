import layerImportConfig from '../../../src/state/layerimportconfig/reducers';

import {GET_LAYERIMPORT_CONFIG, SET_LAYERIMPORT_CONFIG} from '../../../src/state/actiontypes';

describe('uploads', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      config: ['layerName']
    };
  });
  it('has initial state', () => {
    expect(layerImportConfig(undefined, {})).to.deep.equal(defaultState)
  });
  describe('SET_LAYERIMPORT_CONFIG', () => {
    it('sets the upload id in state', () => {
      let action = { type: SET_LAYERIMPORT_CONFIG, config: ['layerName']};
      let state = Object.assign({}, defaultState, {config: ['layerName']});
      expect(layerImportConfig(undefined, action)).to.deep.equal(state);
    });
  });
  describe('GET_LAYERIMPORT_CONFIG', () => {
    it('gets the server url action', () => {
      let action = { type: GET_LAYERIMPORT_CONFIG};
      let state = Object.assign({}, defaultState, {config: ['layerName']});
      expect(layerImportConfig(state, action)).to.deep.equal(['layerName']);
    });
  });
});

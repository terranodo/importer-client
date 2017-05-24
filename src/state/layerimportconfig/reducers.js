import {GET_LAYERIMPORT_CONFIG, SET_LAYERIMPORT_CONFIG} from '../actiontypes';

const defaultState = {
  config: ["layerName"]
}

const layerImportConfig = (state = defaultState, action) => {
  switch(action.type) {
    case GET_LAYERIMPORT_CONFIG:
      return state.config;
    case SET_LAYERIMPORT_CONFIG:
      return Object.assign({}, state, {
        config: action.config
      });
    default:
      return state;
  }
};
export default layerImportConfig;

import {GET_LAYERIMPORT_CONFIG, SET_LAYERIMPORT_CONFIG} from '../actiontypes';

export function getLayerImportConfig() {
  return {
    type: GET_LAYERIMPORT_CONFIG
  }
}
export function setLayerImportConfig(config) {
  return {
    type: SET_LAYERIMPORT_CONFIG,
    config: config
  }
}

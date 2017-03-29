import {GET_UPLOAD_ID, SET_UPLOAD_ID, GET_UPLOAD_STATUS, SET_UPLOAD_STATUS, GET_UPLOAD_COUNT, SET_UPLOAD_COUNT, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE, CONFIGURE_SUCCESS, UPLOADED_DATA_SUCCESS, IMPORT_ALL_SUCCESS, IMPORT_ALL_STARTED, IMPORT_STARTED} from '../actiontypes'

const defaultState = {
  id: undefined,
  status: '',
  count: 0,
  success: false,
  files: undefined,
  data: undefined,
  importLayers: {
    started: false,
    single: {}
  }
};

const uploads = (state = defaultState, action) => {
  let single = {};
  switch(action.type) {
    case SET_UPLOAD_ID:
      return Object.assign({}, state, {
        id: action.uploadId
      })
    case UPLOAD_FILE_FAILURE:
      return Object.assign({}, state, {
        status: 'FAILED',
        success: false,
      })
    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        id: action.result.id,
        status: action.result.state,
        count: action.result.count,
        success: true
      })
    case UPLOADED_DATA_SUCCESS:
      return Object.assign({}, state, {
        data: action.result
      })
    case IMPORT_ALL_SUCCESS:
      return Object.assign({}, state, {
        importLayers: { started: false }
      })
    case IMPORT_ALL_STARTED:
      return Object.assign({}, state, {
        importLayers: { started: true }
      })
    case IMPORT_STARTED:
      single[action.index] = { started: true }
      return Object.assign({}, state, {
        importLayers: {single: single}
      })
    case CONFIGURE_SUCCESS:
      single[action.index] = { success: true }
      return Object.assign({}, state, {
        importLayers: {single: single}
      })
    default:
      return state;
  }
}

export default uploads;

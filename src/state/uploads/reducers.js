import {GET_UPLOAD_ID, SET_UPLOAD_ID, GET_UPLOAD_STATUS, SET_UPLOAD_STATUS, GET_UPLOAD_COUNT, SET_UPLOAD_COUNT, UPLOAD_FILE_SUCCESS, CONFIGURE_SUCCESS, UPLOADED_DATA_SUCCESS} from '../actiontypes'

const defaultState = {
  id: undefined,
  status: '',
  count: 0,
  success: false,
  files: undefined,
  data: undefined
};

const uploads = (state = defaultState, action) => {
  switch(action.type) {
    case SET_UPLOAD_ID:
      return Object.assign({}, state, {
        id: action.uploadId
      })
    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        id: action.result.id,
        status: action.result.status,
        count: action.result.count,
        success: true
      })
    case UPLOADED_DATA_SUCCESS:
      return Object.assign({}, state, {
        data: action.result
      })
    case CONFIGURE_SUCCESS:
      return Object.assign({}, state, {
        id: action.result.id,
        status: action.result.status,
        count: action.result.count,
        success: true
      })
    default:
      return state;
  }
}

export default uploads;

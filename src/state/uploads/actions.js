import {GET_UPLOAD_ID, SET_UPLOAD_ID, GET_UPLOAD_STATUS, SET_UPLOAD_STATUS, GET_UPLOAD_COUNT, SET_UPLOAD_COUNT, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE, CONFIGURE_SUCCESS, UPLOADED_DATA_SUCCESS, IMPORT_ALL_SUCCESS, IMPORT_STARTED, IMPORT_ALL_STARTED} from '../actiontypes'

import {uploadFiles, configure, uploadedData, importAll} from '../../services/geonode';

export function getUploadId() {
  return {
    type: GET_UPLOAD_ID
  }
}
export function uploadFileFailure(message) {
  return {
    type: UPLOAD_FILE_FAILURE,
    message
  }
}
export function uploadFileSuccess(result) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    result
  }
}
export function uploadedDataSuccess(result) {
  return {
    type: UPLOADED_DATA_SUCCESS,
    result
  }
}
export function configureSuccess(result, index) {
  return {
    type: CONFIGURE_SUCCESS,
    index,
    result
  }
}
export function importAllSuccess(result) {
  return {
    type: IMPORT_ALL_SUCCESS,
    result
  }
}
export function importStarted(index) {
  return {
    type: IMPORT_STARTED,
    index
  }
}
export function importAllStarted() {
  return {
    type: IMPORT_ALL_STARTED,
    startImport: true
  }
}
export function upload(files) {
  return (dispatch, getState) => {
    const state = getState();
    let server = state.server.url;
    return uploadFiles(server, files)
    .then((json) => dispatch(uploadFileSuccess(json)))
    .catch((ex) => dispatch(uploadFileFailure(ex)))
  }
}
export function getUploadedData() {
  return (dispatch, getState) => {
    const state = getState();
    let server = state.server.url;
    let id = state.uploads.id;
    return uploadedData(server, id)
    .then((json) => dispatch(uploadedDataSuccess(json)))
  }
}
export function configureUploads(config, index) {
  return (dispatch, getState) => {
    const state = getState();
    let server = state.server.url;
    let id = state.uploads.id;
    dispatch(importStarted(index));
    return configure(server, id, config)
    .then((json) => dispatch(configureSuccess(json, index)));
  }
}
export function importAllLayers() {
  return (dispatch, getState) => {
    const state = getState();
    let server = state.server.url;
    let id = state.uploads.id;
    dispatch(importAllStarted());
    return importAll(server, id)
    .then((json) => dispatch(importAllSuccess(json)))
    .then((json) => dispatch(getUploadedData()))
  }
}

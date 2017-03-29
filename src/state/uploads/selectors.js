export function uploadSuccess(state) {
  return (state.uploads.status === "UPLOADED")
}
export function uploadFailed(state) {
  return (state.uploads.status === "FAILED")
}
export function uploadData(state) {
  return (state.uploads.data) ? true : false
}
export function getUploadData(state) {
  return state.uploads.data;
}
export function uploadId(state) {
  return state.uploads.id;
}
export function importStarted(state) {
  return state.uploads.importLayers.started;
}
export function singleImportStarted(state, index) {
  return (state.uploads.importLayers.single[index] && state.uploads.importLayers.single[index].started) ? true : false;
}
export function isLayerImported(state, index) {
  return (state.uploads.importLayers.single[index] && state.uploads.importLayers.single[index].success) ? true : false;
}

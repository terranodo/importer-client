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
export function isCurrentlyImporting(state) {
  if(state.uploads.data) {
    let layerStatus = state.uploads.data.layers.map(elem => elem.import_status);
    return layerStatus.filter((elem, index, arr) => elem === "PENDING" || elem === null).length > 1
  }
  return true;
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

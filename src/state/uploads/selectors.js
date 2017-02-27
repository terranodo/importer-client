export function uploadSuccess(state) {
  return (state.uploads.status === "UPLOADED")
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
  return state.uploads.import.started;
}

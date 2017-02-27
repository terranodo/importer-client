export function uploadSuccess(state) {
  return (state.uploads.status === "success")
}
export function uploadData(state) {
  return (state.uploads.data.length > 0)
}
export function getUploadData(state) {
  return state.uploads.data;
}
export function uploadId(state) {
  return state.uploads.id;
}

import {connect} from 'react-redux';
import Uploader from './upload'
import {upload, getUploadedData} from '../state/uploads/actions'

function mapStateToProps(state) {
  const {server, uploads} = state;
  return {
    server,
    uploads
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    uploadFiles: (files) => {
      dispatch(upload(files))
    },
  }
}
const UploaderLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);

export default UploaderLink;

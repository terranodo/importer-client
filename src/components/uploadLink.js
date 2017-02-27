import {connect} from 'react-redux';
import Uploader from './upload'
import {upload, getUploadedData} from '../state/uploads/actions'

function mapStateToProps(state) {
  const {server, upload} = state;
  return {
    server,
    upload
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    uploadFiles: (files) => {
      dispatch(upload(files))
    },
    getUploadedFiles: () => {
      dispatch(getUploadedData());
    }
  }
}
const UploaderLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);

export default UploaderLink;

import {connect} from 'react-redux';
import Importer from './importer'
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
    getUploadedFiles: () => {
      dispatch(getUploadedData());
    }
  }
}
const ImporterLink= connect(
  mapStateToProps,
  mapDispatchToProps
)(Importer);

export default ImporterLink;

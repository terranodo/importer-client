import {connect} from 'react-redux';
import UploadedData from './uploadedData'

import {importAllLayers} from '../state/uploads/actions'

function mapStateToProps(state) {
  const {server, uploads} = state;
  return {
    server,
    uploads
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    importAll: () => {
      dispatch(importAllLayers());
    }
  }
}
const UploadedDataLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadedData);

export default UploadedDataLink;

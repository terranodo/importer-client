import {connect} from 'react-redux';
import LayerImport from './layerImport'
import {configureUploads} from '../state/uploads/actions'
import {createLayerConfigWithName} from '../services/geonode'

function mapStateToProps(state) {
  const {server, uploads} = state;
  return {
    server,
    uploads
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    configureLayerWithName: (name, index) => {
      dispatch(configureUploads(createLayerConfigWithName(name), index));
    }
  }
}
const LayerImportLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayerImport);

export default LayerImportLink;

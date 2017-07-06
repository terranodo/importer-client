import {connect} from 'react-redux';
import LayerImport from './layerImport'
import {configureUploads} from '../state/uploads/actions'
import {createLayerConfigWithName} from '../services/customization'

function mapStateToProps(state) {
  const {server, uploads, layerImportConfig} = state;
  return {
    server,
    uploads,
    config: layerImportConfig.config
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    configureLayerWithName: (name, index) => {
      dispatch(configureUploads(createLayerConfigWithName(name), index));
    },
    configureLayerWithConfig: (config, index) => {
      dispatch(configureUploads(config, index));
    }
  }
}
const LayerImportLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayerImport);

export default LayerImportLink;

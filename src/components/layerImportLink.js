import {connect} from 'react-redux';
import LayerImport from './layerImport'
import {configureUploads} from '../state/uploads/actions'
import {createLayerConfigWithName} from '../services/config'

function mapStateToProps(state) {
  const {server, uploads} = state;
  return {
    server,
    uploads,
    config: {
      edit_name: true,
      edit_time: false,
      other: []
    }
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

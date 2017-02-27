import React from 'react';

import {uploadedData} from '../services/geonode';
import {uploadSuccess} from '../state/uploads/selectors';

class UploadedLayer extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  };
  _importStatus() {
    return this.props.layer.import_status || 'not available'
  };
  _name() {
    return this.props.layer.name || 'not available'
  };
  render() {
    return (<div>
              Import Status: {this._importStatus()}
              Name: {this._name()}
            </div>)
  }
};
export default UploadedLayer;

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
              <p><b>Import Status:</b> {this._importStatus()}</p>
              <p><b>Name:</b> {this._name()}</p>
              <p><button>Create Layer</button></p>
            </div>)
  }
};
export default UploadedLayer;

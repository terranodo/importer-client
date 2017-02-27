import React from 'react';

import {uploadedData} from '../services/geonode';
import {uploadSuccess} from '../state/uploads/selectors';
import UploadedLayer from './uploadedLayer';

class UploadedData extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
            {this.props.data.layers.map(function(layer, index){
              return <UploadedLayer layer={layer}></UploadedLayer>;
            })}
            </div>)
  }
};
export default UploadedData;

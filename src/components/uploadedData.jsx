import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {uploadedData} from '../services/geonode';
import {uploadSuccess} from '../state/uploads/selectors';
import UploadedLayer from './uploadedLayer';

class UploadedData extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    importAll: React.PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  _handleImport() {
    if(this.props.importAll) {
      this.props.importAll();
    }
  }
  render() {
    return (<div>
            {this.props.data.layers.map(function(layer, index){
              return <UploadedLayer key={index} layer={layer}></UploadedLayer>;
            })}
            <RaisedButton primary={true} onClick={this._handleImport.bind(this)} label={"Import all Layers"}/>
            </div>)
  }
};
export default UploadedData;

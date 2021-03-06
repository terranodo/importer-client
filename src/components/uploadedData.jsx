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
            <RaisedButton secondary={true} onClick={this._handleImport.bind(this)} label={"Import all Layers"}/>
            {this.props.data.layers.map(function(layer, index){
              return <UploadedLayer id={index} key={index} layer={layer}></UploadedLayer>;
            })}
            </div>)
  }
};
export default UploadedData;

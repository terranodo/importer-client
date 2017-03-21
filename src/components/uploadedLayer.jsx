import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {uploadedData} from '../services/geonode';
import {uploadSuccess} from '../state/uploads/selectors';

import LayerImport from './layerImport';

class UploadedLayer extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      import: false
    }
  };
  _importStatus() {
    return this.props.layer.import_status || 'not imported'
  };
  _name() {
    return this.props.layer.name || 'not available'
  };
  _handleImport() {
    this.setState({import: true});
  };
  render() {
    let singleLayerWizard = (<LayerImport show={this.state.import} layer={this.props.layer} />);
    let style = { padding: 5, margin: 10};
    return (<div>
						 <Card containerStyle={style}>
								<CardHeader
									title={this._name()}
									subtitle={this._importStatus()}
								/>
								<CardActions>
									<RaisedButton primary={true} onClick={this._handleImport.bind(this)} label={"Create Layer"}/>
								</CardActions>
              </Card>
              {singleLayerWizard}
            </div>)
  }
};
export default UploadedLayer;

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

import {uploadedData} from '../services/geonode';
import {uploadSuccess} from '../state/uploads/selectors';

import LayerImportLink from './layerImportLink';

class UploadedLayer extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    id: React.PropTypes.number
  };
  constructor(props) {
    super(props);
  };
  _importStatus() {
    return this.props.layer.import_status || 'not imported'
  };
  _isImporting() {
    return (this._importStatus() !== 'not imported' && this._importStatus() !== 'SUCCESS');
  }
  _name() {
    return this.props.layer.name || 'not available'
  };
  render() {
    let style = { padding: 5, margin: 10};
    let avatar = undefined;
    if(this._isImporting()) {
      avatar = (<CircularProgress />)
    }
    return (<div>
						 <Card containerStyle={style}>
								<CardHeader
									title={this._name()}
									subtitle={this._importStatus()}
                  avatar={avatar}
								/>
								<CardActions>
                  <LayerImportLink id={this.props.id} show={false} layer={this.props.layer} />
								</CardActions>
              </Card>
            </div>)
  }
};
export default UploadedLayer;

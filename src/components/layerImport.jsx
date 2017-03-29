import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Wizard from './step';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {isLayerImported, singleImportStarted} from '../state/uploads/selectors';

export default class LayerImport extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool,
    id: React.PropTypes.number
  };
  constructor(props) {
    super(props);
    this.state= {
      show: false,
      step: 1,
      steps: 2,
      importing: false,
      layerName: props.layer.name
    }
    this.stepContent = ["Name", "Import"];
  };
  componentWillReceiveProps(nextProps) {
    if(isLayerImported(nextProps, nextProps.id)) {
      this._handleClose();
      this.setState({step: 1, layerName: nextProps.layer.name});
    }
    this.setState({importing: singleImportStarted(nextProps, nextProps.id) });
  }
  next() {
    this.setState({
      step: this.state.step+1
    })
  }
  prev() {
    this.setState({
      step: this.state.step-1
    })
  }
  _handleClose() {
    this.setState({show: false});
    this.setState({step: 1, layerName: this.props.layer.name});
  }
  _handleOpen() {
    this.setState({show: true});
  }
  _handleNameChange(event, newValue) {
    this.setState({layerName: newValue});
  }
  _handleImport() {
    this.props.configureLayerWithName(this.state.layerName, this.props.id);
    this.setState({importing: true});
  }
  render() {
    let stepElem;
    let toggleStyle = { margin: 10 }
    let buttonLabel = this.state.importing ? 'Importing ...' : 'Create Layer';
    let actions = []
    let defaultAction = (<FlatButton primary={false} onClick={this._handleClose.bind(this)} label={"Cancel"}/>)
    actions.push(defaultAction);
    if(this.state.step === 1) {
      stepElem = (<div>
                    <h1>Layer Name</h1>
                    <TextField
                      name="layername"
                      defaultValue={this.state.layerName}
                      onChange={this._handleNameChange.bind(this)}/>
                  </div>);
    }
    if(this.state.step === this.state.steps) {
      let createAction = (<div>
                  <RaisedButton
                    label={buttonLabel}
                    primary={true}
                    disabled={this.state.importing}
                    onClick={this._handleImport.bind(this)}
                    />
                 </div>);
      actions.push(createAction);
    }
    return (
      <div className="import">
        <RaisedButton primary={true} onClick={this._handleOpen.bind(this)} label={"Create Layer"}/>
        <Dialog open={this.state.show} title="Create Layer" modal={false} onRequestClose={this._handleClose.bind(this)} actions={actions}>
          <Wizard stepContent={this.stepContent} step={this.state.step} steps={this.state.steps} prev={this.prev.bind(this)} next={this.next.bind(this)}>{stepElem}</Wizard>
        </Dialog>
      </div>
    )
  }
};

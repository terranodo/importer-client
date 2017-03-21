import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Wizard from './step';
import RaisedButton from 'material-ui/RaisedButton';

export default class LayerImport extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state= {
      show: false,
      step: 1,
      steps: 4,
      layerName: props.layer.name
    }
    this.stepContent = ["Name", "Enable Time", "History", "Import"];
  };
  componentWillReceiveProps(nextProps) {
    this.setState({show: nextProps.show});
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
  _enableTime() {
    this.stepContent = ["Name", "Enable Time", "Configure Time", "History", "Import"];
    this.setState({steps: 5});
  }
  _disableTime() {
    this.stepContent = ["Name", "Enable Time", "History", "Import"];
    this.setState({steps: 4});
  }
  _handleClose() {
    this.setState({show: false});
  }
  _handleNameChange(event, newValue) {
    this.setState({layerName: newValue});
  }
  _handleHistoryChange(event, isInputChecked) {
  }
  _handleTimeChange(event, isInputChecked) {
    isInputChecked ? this._enableTime() : this._disableTime();
  }
  _handleImport() {
  }
  render() {
    let stepElem;
    let toggleStyle = { margin: 10 }
    if(this.state.step === 1) {
      stepElem = (<div>
                    <h1>Layer Name</h1>
                    <TextField
                      name="layername"
                      defaultValue={this.state.layerName}
                      onChange={this._handleNameChange.bind(this)}/>
                  </div>);
    }
    if(this.state.step === 2) {
      stepElem = (<div>
                  <h1>Does the dataset have time attributes?</h1>
                  <Toggle
                       label="Yes"
                       style={toggleStyle}
                       onToggle={this._handleTimeChange.bind(this)}
                     />
                 </div>);
    }
    if(this.state.step === 3 && this.state.steps === 5){
      stepElem = (<div>
                  <h1>Configure your time attributes:</h1>
                 </div>);
    }
    if((this.state.step === 3 && this.state.steps === 4) || (this.state.step === 4 && this.state.steps === 5)){
      stepElem = (<div>
                  <h1>Enable version history?</h1>
                  <Toggle
                       label="Yes"
                       style={toggleStyle}
                       onToggle={this._handleHistoryChange.bind(this)}
                     />
                 </div>);
    }
    if(this.state.step === this.state.steps) {
      stepElem = (<div>
                  <RaisedButton
                    label="Create Layer"
                    primary={true}
                    onTouchTap={this._handleImport.bind(this)}
                    />
                 </div>);
    }
    return (
      <Dialog open={this.state.show} title="Create Layer" onRequestClose={this._handleClose}>
        <Wizard stepContent={this.stepContent} step={this.state.step} steps={this.state.steps} prev={this.prev.bind(this)} next={this.next.bind(this)}>{stepElem}</Wizard>
      </Dialog>
    )
  }
};

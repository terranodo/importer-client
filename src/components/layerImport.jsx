import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Wizard from './step';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {textFieldForKey} from '../componentHelpers.js'

import {isLayerImported, singleImportStarted} from '../state/uploads/selectors';

export default class LayerImport extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool,
    id: React.PropTypes.number
  };
  constructor(props) {
    super(props);
    let config = {
      edit_name: true,
      edit_time: false,
      other: [{
        title: 'GeoGig',
        api_name: 'geogig',
        type: 'text'
      }]
    }
    let configArray = this.generateConfigArray(config)
    this.stepContent = this.generateStepContent(configArray);
    this.state= {
      show: false,
      step: 1,
      steps: this.stepContent.length,
      importing: false,
      layerName: props.layer.name,
      config: configArray
    }
    configArray.forEach( (d) => {
      this.state[d.api_name] = props.layer[d.api_name];
    })
  };
  componentWillReceiveProps(nextProps) {
    if(isLayerImported(nextProps, nextProps.id)) {
      this._handleClose();
      this.setState({step: 1, layerName: nextProps.layer.name});
    }
    this.setState({importing: singleImportStarted(nextProps, nextProps.id) });
  }
  generateConfigArray(config) {
    let configArray = [];
    if(config.edit_name) {
      configArray.push({title: 'Layer Name', api_name: 'layerName', type: 'text'});
    }
    if(config.edit_time) {
      configArray.push({title: 'Time', api_name: 'time', type: 'date'});
    }
    if(config.edit_permission) {
    }
    return configArray.concat(config.other);
  }
  generateStepContent(configArray) {
    let stepContent = [];
    stepContent = configArray.map( (d, index) => {
      return d.title;
    })
    stepContent.push("Import");
    return stepContent;
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
  _handleInputChange(keyValue, newValue) {
    let state = {};
    state[keyValue] = newValue;
    this.setState(state);
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
    }else {
      let {layer} = this.props;
      let {title, api_name, type}= this.state.config[this.state.step-1];
      let headline = (<h1>{title}</h1>)
      let field;
      if(type === "text") {
        field = textFieldForKey(api_name, this.state[api_name], this._handleInputChange.bind(this))
      }
      const className = `step-${this.state.step}`
      stepElem = (<div className={className}>
                  {headline}
                  {field}
                  </div>
                 );
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

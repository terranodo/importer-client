import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Wizard from './step';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {textFieldForKey, selectFieldForKey} from '../componentHelpers'
import {generateConfigArray, generateTitleArray, createLayerConfigFromConfigArray} from '../services/config'
import MenuItem from 'material-ui/MenuItem';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {isLayerImported, singleImportStarted} from '../state/uploads/selectors';

export default class LayerImport extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool,
    id: React.PropTypes.number
  };
  constructor(props) {
    super(props);
    this.apiItems = Object.keys(props.layer);
    this.stepContent = Object.keys(props.config.steps).map((d, i) => { return props.config.steps[d].title; });
    this.stepContent.push("Import");
    this.state= {
      show: false,
      step: 1,
      steps: this.stepContent.length,
      importing: false,
      layerName: props.layer.name
    }
    Object.keys(props.config.steps).map((d, i) => {
      props.config.steps[d].steps.forEach( (d) => {
        this.state[d.api_name] = props.layer[d.api_name];
      });
    });
  };
  componentWillReceiveProps(nextProps) {
    if(isLayerImported(nextProps, nextProps.id)) {
      this._handleClose();
      this.setState({step: 1, layerName: nextProps.layer.name});
    }
    this.setState({importing: singleImportStarted(nextProps, nextProps.id) });
  }
  generateApiItems(layer) {
    return configArray.map( (d, index) => {
      return {title: d.title, value: d.api_name };
    });
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
    this.props.configureLayerWithConfig(createLayerConfigFromConfigArray(this.props.config, this.state), this.props.id);
    this.setState({importing: true});
  }
  menuItems(items) {
    return items.map((item, index) => (
      <MenuItem
        key={index}
        value={item}
        primaryText={item}
      />
    ));
  }
  render() {
    let stepElem;
    let toggleStyle = { margin: 10 }
    let buttonLabel = this.state.importing ? 'Importing ...' : 'Create Layer';
    let actions = []
    let defaultAction = (<FlatButton primary={false} onClick={this._handleClose.bind(this)} label={"Cancel"}/>)
    actions.push(defaultAction);
    if(this.state.step === this.state.steps) {
      let headline = (<h1>Import Layer</h1>)
      let createAction = (<div>
                  <RaisedButton
                    className='import-btn'
                    label={buttonLabel}
                    primary={true}
                    disabled={this.state.importing}
                    onClick={this._handleImport.bind(this)}
                    />
                 </div>);
      actions.push(createAction);
    }else {
      let {layer} = this.props;
      let {title, steps}= this.props.config.steps[this.state.step];
      let headline = (<h1>{title}</h1>)
      let fields = steps.map( (d, i) => {
        let {subtitle, api_name, type} = d;
        let field;
        if(type === "text") {
          field = textFieldForKey(api_name, this.state[api_name], this._handleInputChange.bind(this))
        }else if(type === "fields") {
          field = selectFieldForKey(api_name, this.menuItems(this.apiItems), this.state[api_name], this._handleInputChange.bind(this));
        }
        const elem = (<div key={i}>{field}<br/></div>);
        return elem;
      });
      const className = `step-${this.state.step}`
      stepElem = (<div className={className}>
                  {headline}
                  {fields}
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

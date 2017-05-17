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
import {convertConfigToSteps, importLayerConfig} from '../services/config';
import Select from './fields/select';

export default class LayerImport extends React.PureComponent {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    config: React.PropTypes.array.isRequired,
    show: React.PropTypes.bool,
    id: React.PropTypes.number
  };
  constructor(props) {
    super(props);
    this.apiItems = Object.keys(props.layer);
    this.stepContent = convertConfigToSteps(props.config, props.layer);
    this.stepTitles = this.stepContent.map( (d) => { return d.title()})
    this.stepTitles.push("Import");
    this.state= {
      show: false,
      step: 1,
      steps: this.stepTitles.length,
      importing: false,
      layerName: props.layer.name
    }
    this.stepContent.forEach((d, i) => {
      d.fields().forEach( (d) => {
        this.state[d.name] = props.layer[d.name];
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
    let values = Object.assign({},this.state);
    delete values.steps;
    delete values.step;
    delete values.importing;
    delete values.show;
    this.props.configureLayerWithConfig(importLayerConfig(this.stepContent, values), this.props.id);
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
      let currentStep = this.stepContent[this.state.step-1];
      let fields = currentStep.fields();
      let title = currentStep.title();
      let headline = (<h1>{title}</h1>)
      let fieldItems = fields.map( (d, i) => {
        let {subtitle, name, type, values} = d;
        let field;
        if(type === "text") {
          field = textFieldForKey(name, this.state[name], this._handleInputChange.bind(this), subtitle)
        }else if(type === "select") {
          field = <Select keyName={name} items={values} value={this.state[name]} callback={this._handleInputChange.bind(this)} label={subtitle}/>;
        }else if(type === "fields") {
          values = Promise.resolve(this.apiItems)
          field = <Select keyName={name} items={values} value={this.state[name]} callback={this._handleInputChange.bind(this)} label={subtitle}/>;
        }
        const elem = (<div key={i}>{field}<br/></div>);
        return elem;
      });
      const className = `step-${this.state.step}`
      stepElem = (<div className={className}>
                  {headline}
                  {fieldItems}
                  </div>
                 );
    }
    return (
      <div className="import">
        <RaisedButton primary={true} onClick={this._handleOpen.bind(this)} label={"Create Layer"}/>
        <Dialog open={this.state.show} title="Create Layer" modal={false} onRequestClose={this._handleClose.bind(this)} actions={actions}>
          <Wizard stepContent={this.stepTitles} step={this.state.step} steps={this.state.steps} prev={this.prev.bind(this)} next={this.next.bind(this)}>{stepElem}</Wizard>
        </Dialog>
      </div>
    )
  }
};

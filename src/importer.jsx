import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

import UploaderLink from './components/uploadLink';
import Step from './components/step';

class Importer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      steps: 2
    };
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
  render() {
    let stepElem;
    if(this.state.step === 1) {
        stepElem = (<UploaderLink />)
    }
    if(this.state.step === 2) {
        stepElem = (<div>Test</div>)
    }
    return (
      <div>
        <Step step={this.state.step} steps={this.state.steps} prev={this.prev.bind(this)} next={this.next.bind(this)}>{stepElem}</Step>
      </div>
    )
  }
};

export default Importer;

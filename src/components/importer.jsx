import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

import UploaderLink from './uploadLink';
import UploadedDataLink from './uploadedDataLink';
import {uploadSuccess, uploadId, uploadData, getUploadData, importStarted} from '../state/uploads/selectors';
import Wizard from './step';

class Importer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      steps: 2
    };
    this.data = {layers: [{name: "Test"},{name: "Test"}]};
  }
  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeout);
    if(uploadSuccess(nextProps) && !uploadData(nextProps)) {
      this.props.getUploadedFiles();
    }
    if(importStarted(nextProps)) {
      this.startPoll();
    }
    if(uploadData(nextProps)) {
      this.data = getUploadData(nextProps);
      this.setState({ step: 2});
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
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
  startPoll (){
   this.timeout = setTimeout(() =>  this.props.getUploadedFiles(), 2000);
  }
  render() {
    let stepElem;
    if(this.state.step === 1) {
      stepElem = (<UploaderLink />)
    }
    if(this.state.step === 2) {
      stepElem = (<UploadedDataLink data={this.data}></UploadedDataLink>);
    }
    let stepContent = ["Upload Layer", "Import/Create Layer(s)"];
    return (
      <div>
        <Wizard stepContent={stepContent} showButtons={false} step={this.state.step} steps={this.state.steps} prev={this.prev.bind(this)} next={this.next.bind(this)}>{stepElem}</Wizard>
      </div>
    )
  }
};

export default Importer;

import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

import UploaderLink from './uploadLink';
import UploadedDataLink from './uploadedDataLink';
import {uploadSuccess, uploadId, uploadData, getUploadData, importStarted} from '../state/uploads/selectors';
import Step from './step';

class Importer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      steps: 1
    };
  }
  componentWillReceiveProps(nextProps) {
    if(uploadSuccess(nextProps) && !uploadData(nextProps)) {
      this.props.getUploadedFiles();
    }
    if(importStarted(nextProps)) {
      this.props.getUploadedFiles();
    }
    if(uploadData(nextProps)) {
      this.data = getUploadData(nextProps);
      this.setState({ step: 2});
    }
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
      stepElem = (<UploadedDataLink data={this.data}></UploadedDataLink>);
    }
    return (
      <div>
        <Step showButtons={false} step={this.state.step} steps={this.state.steps} prev={this.prev.bind(this)} next={this.next.bind(this)}>{stepElem}</Step>
      </div>
    )
  }
};

export default Importer;

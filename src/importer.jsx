import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

import Dropzone from 'react-dropzone';
import {uploadFiles} from './services/geonode';

class Importer extends React.Component {
  constructor(props) {
    super(props);
  }
  onDrop(files) {
    console.log('Received files: ', files);
    let server = 'http://52.37.73.154/';
    uploadFiles(server, files);
  }
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    )
  }
};

export default Importer;

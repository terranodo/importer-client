import React from 'react';

import Dropzone from 'react-dropzone';
import {uploadFiles} from '../services/geonode';
import {uploadSuccess, uploadId, uploadData, getUploadData, importStarted} from '../state/uploads/selectors';
import UploadedDataLink from './uploadedDataLink';

class Uploader extends React.PureComponent {
  static propTypes = {
    server: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      text: "Drop a file here or click to open upload window."
    }
  }
  onDrop(files) {
    this.props.uploadFiles(files);
    this.setState({ text: "Uploading..."});
  }
  render() {
    return (
      <div>
        <Dropzone multiple={false} onDrop={this.onDrop.bind(this)}>
          <div>{this.state.text}</div>
        </Dropzone>
      </div>
    )
  }
};

export default Uploader;

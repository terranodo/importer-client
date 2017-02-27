import React from 'react';

import Dropzone from 'react-dropzone';
import {uploadFiles} from '../services/geonode';
import {uploadSuccess, uploadId, uploadData, getUploadData} from '../state/uploads/selectors';

class Uploader extends React.PureComponent {
  static propTypes = {
    server: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.success = false;
  }
  componentWillReceiveProps(nextProps) {
    if(uploadSuccess(nextProps)) {
      this.success = true;
      this.props.getUploadedFiles();
    }
    if(uploadData) {
      this.data = getUploadData();
    }
  }
  onDrop(files) {
    this.props.uploadFiles(this.props.server.url, files);
  }
  render() {
    let upload = undefined;
    if(this.success && this.data) {
      upload = (<UploadedData data={this.data}></UploadedData>);
    }else {
      upload = (
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
      );
    }
    return (
      <div>
        {upload}
      </div>
    )
  }
};

export default Uploader;

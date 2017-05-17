import React from 'react';

import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import {uploadFiles} from '../services/geonode';
import {uploadSuccess, uploadFailed, uploadId, uploadData, getUploadData, importStarted} from '../state/uploads/selectors';
import UploadedDataLink from './uploadedDataLink';

class Uploader extends React.PureComponent {
  static propTypes = {
    server: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      text: "Drop a file here or click to open upload window.",
      showProgress: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if(uploadFailed(nextProps)) {
      this.setState({text: 'Upload Failed', showProgress: false});
    }
  }
  onDrop(files) {
    this.props.uploadFiles(files);
    this.setState({ showProgress: true});
  }
  render() {
    const progress = this.state.showProgress ? (<CircularProgress />) : this.state.text;
    return (
      <Dropzone multiple={false} onDrop={this.onDrop.bind(this)}>
        <div>{progress}</div>
      </Dropzone>
    )
  }
};

export default Uploader;

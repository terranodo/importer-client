import React from 'react';
import MuiTextField from 'material-ui/TextField';

export default class TextField extends React.PureComponent {
  static propTypes = {
    keyName: React.PropTypes.string,
    value: React.PropTypes.string,
    callback: React.PropTypes.func,
    label: React.PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = { loading: true, value: null };
  }
  componentDidMount() {
    this.props.value.then(
      value => this.setState({loading: false, value: value}),
      error => this.setState({loading: false, error: error}));
  }
  render() {
    return (<MuiTextField
      floatingLabelText={this.props.label}
      key={this.props.keyName}
      name={this.props.keyName}
      value={this.state.value}
      onChange={(event, index, newValue) => { this.props.callback(this.props.keyName, newValue)}}
      />
    )
  }
};

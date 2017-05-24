import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Select extends React.PureComponent {
  static propTypes = {
    keyName: React.PropTypes.string,
    value: React.PropTypes.string,
    items: React.PropTypes.object,
    callback: React.PropTypes.func,
    label: React.PropTypes.string,
    multiple: React.PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = { loading: true, value: null };
  }
  componentDidMount() {
    this.props.items.then(
      value => this.setState({loading: false, value: value}),
      error => this.setState({loading: false, error: error}));
  }
  menuItems(items) {
    return items.map((item, index) => (
      <MenuItem
        className={'item item-'+index}
        key={index}
        value={item}
        primaryText={item}
      />
    ));
  }
  render() {
    let items;
    if(this.state.value) {
      items = ( this.menuItems(this.state.value) )
    }
    return (<SelectField
      key={this.props.keyName}
      floatingLabelText={this.props.label}
      onChange={(event, index, newValue) => { this.props.callback(this.props.keyName, newValue)}}
      value={this.props.value}
      multiple={this.props.multiple}
      >
      {items}
      </SelectField>);
  }
};

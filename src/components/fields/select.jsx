import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Select extends React.PureComponent {
  static propTypes = {
    keyName: React.PropTypes.string,
    items: React.PropTypes.object,
    callback: React.PropTypes.func,
    label: React.PropTypes.string,
    multiple: React.PropTypes.bool,
  };
  constructor(props) {
    super(props);
    let currentValue = props.value ? props.value : (props.multiple ? [] : null)
    this.state = { loading: true, items: null, currentValue: currentValue };
  }
  componentDidMount() {
    if(this.props.items) {
      this.props.items.then(
        result => this.setState({loading: false, items: result}),
        error => this.setState({loading: false, error: error}));
    }
  }
  menuItems(items) {
    return items.map((item, index) => (
      <MenuItem
        className={'item item-'+index}
        key={index}
        value={item}
        insetChildren={this.props.multiple}
        checked={this.props.multiple && this.state.currentValue && this.state.currentValue.indexOf(item) > -1}
        primaryText={item}
      />
    ));
  }
  handleChange(event, index, newValues) {
    this.setState({currentValue: newValues});
    this.props.callback(this.props.keyName, newValues)
  }
  render() {
    let selectItems;
    const {currentValue, items} = this.state;
    if(items) {
      selectItems = ( this.menuItems(items) )
    }
    return (<SelectField
      key={this.props.keyName}
      floatingLabelText={this.props.label}
      onChange={this.handleChange.bind(this)}
      value={currentValue}
      multiple={this.props.multiple}
      >
      {selectItems}
      </SelectField>);
  }
};

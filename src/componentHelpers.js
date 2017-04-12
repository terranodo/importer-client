import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

export const textFieldForKey = (keyName, value, changeCallback, label='') => {
  return (<TextField
          floatingLabelText={label}
          key={keyName}
          name={keyName}
          value={value}
          onChange={(event, newValue) => { changeCallback(keyName, newValue)}}/>
        )
}
export const selectFieldForKey = (keyName, items, value, changeCallback, label='') => {
  return (<SelectField
    key={keyName}
    floatingLabelText={label}
    onChange={(event, index, newValue) => { changeCallback(keyName, newValue)}}
    value={value}
    >
      {items}
    </SelectField>);
}

import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

export const textFieldForKey = (keyName, value, changeCallback) => {
  return (<TextField
          key={keyName}
          name={keyName}
          value={value}
          onChange={(event, newValue) => { changeCallback(keyName, newValue)}}/>
        )
}
export const selectFieldForKey = (keyName, items, value, changeCallback) => {
  return (<SelectField
    key={keyName}
    onChange={(event, index, newValue) => { changeCallback(keyName, newValue)}}
    value={value}
    >
      {items}
    </SelectField>);
}

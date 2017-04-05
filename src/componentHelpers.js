import React from 'react';
import TextField from 'material-ui/TextField';

export const textFieldForKey = (keyName, value, changeCallback) => {
  return (<TextField
    name={keyName}
    value={value}
    onChange={(event, newValue) => { changeCallback(keyName, newValue)}}/>
  )
}

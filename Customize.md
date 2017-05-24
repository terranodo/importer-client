# Configuration

The importer wizard is easily customizable. You can specify the order and type of steps to be displayed in the wizard.
Right now we have a few limitations. Form types is limited to textfields and select fields. This will probably change in the future when more requests come in. 
But a lot can be accomplished from these two types. 

## Sample
```
var layerName = function() {
  var layer, options,valuePromise,
  title = 'Layer Name';
  var steps = function(layer, options) {
    valuePromise = Promise.resolve(layer.layerName); // change this value for the layer field
  };
  steps.title = function() {
    return title;
  };
  steps.fields = function() {
    return [{
      name: 'layerName', // change this value for the api field
      type: 'text',
      value: valuePromise
    }];
  }
  steps.convert = function(values) {
    return values;
  }
  steps.valid = function(values) {
    return values;
  }
  return steps;
}
```

Let's break it down. This is a normal js function. It has to have the steps function and must return it. This function will be called and used for the generation. It has to have `title`, `fields`, `convert` and `valid` methods. 
### `title` method
Title will be used to display the step name. 

### `fields` method
Fields returns an array containing objects with `name`, `type` and `value`.   
`name` is the name for the api object.  
`type` is one of the following and is the form type:  
- text
- select
- multiselect

`value` is a Promise which should be resolved in the `steps` method. 

### `convert` method
Your chance to convert or add additional values to the api post object. 
For example depending on the value you can add values or change the resulting value.
Always return the values with any additional values.

## Defaults

There are already some default steps that can be used but do not have to be. These are:
- Layer name
- Date (start and enddate)

### Layer Name

Per default, the layername is a textfield which has the properite `layerName` of the layer assigned to it. And will be written to `layerName`as the api field. If you want to change that, use the template below and change the name value.

```
var layerName = function() {
  var layer, options,valuePromise,
  title = 'Layer Name';
  var steps = function(layer, options) {
    valuePromise = Promise.resolve(layer.layerName); // change this value for the layer field
  };
  steps.title = function() {
    return title;
  };
  steps.fields = function() {
    return [{
      name: 'layerName', // change this value for the api field
      type: 'text',
      value: valuePromise
    }];
  }
  steps.convert = function(values) {
    return values;
  }
  steps.valid = function(values) {
    return true;
  }
  return steps;
}
```

### DateTime

```
var dateTime = function dateTime() {
  var layer, options, valuePromise,
  title = 'Time';
  var steps = function(layer, options) {
    valuePromise = Promise.resolve(Object.keys(layer));
  }
  steps.title = function() {
    return title;
  };
  steps.fields = function() {
    return [{
      name: 'start_date',
      type: 'select',
      values: valuePromise,
      subtitle: 'Start Date'
    },
    {
      name: 'end_date',
      type: 'select',
      values: valuePromise,
      subtitle: 'End Date'
    }]
  }
  steps.convert = function(values) {
    if(values.start_date) {
      let convertToDate = [values.start_date];
      if(values.end_date) { convertToDate.push(values.end_date)};
      return Object.assign({}, values, {configureTime: true, convert_to_date: convertToDate});
    }
    return values;
  }
  steps.valid = function(values) {
    return true;
  }
  return steps;
}
```

### Permissions

```
var permission = function() {
  var layer, options, valuePromise,
  title = 'Permissions';
  var constructUserObject = (users, type, result) => {
    let usersLength = users.length;
    for(let i=0;i<usersLength;i++) {
      if(result.users[users[i]]) {
        result.users[users[i]].push(type);
      } else {
        result.users[users[i]] = [type];
      }
    }
    return result;
  }
  var steps = function(layer, options) {
    valuePromise = new Promise(function (resolve, reject){
      let url = options.siteUrl+'/account/ajax_lookup';
      return fetch(url, {method: 'POST'}).then(function(result) {
        return result.json();
      }).then( (json) => {
        if(json.count > 0) {
          resolve(json.users)
        }else {
          resolve([]);
        }
      }).catch( function(error) { reject(error) });
    });
  }
  steps.title = function() {
    return title;
  };
  steps.fields = function() {
    return [
      {
        name: 'view_resourcebase',
        type: 'multiselect',
        values: valuePromise,
        subtitle: 'Who can see the layer'
      },
      {
        name: 'download_resourcebase',
        type: 'multiselect',
        values: valuePromise,
        subtitle: 'Who can download the layer'
      },
      {
        name: 'change_layer_data',
        type: 'multiselect',
        values: valuePromise,
        subtitle: 'Who can download the layer'
      }
    ]
  }
  steps.convert = function(values) {
    let result = {users: {'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}};
    result = ['view_resourcebase', 'download_resourcebase'].reduce( (result, type) => {
      return constructUserObject(values[type], type, result);
    }, result);
    return {permissions: result};
  }
  steps.valid = function(values) {
    return true;
  }
  return steps;
}
```

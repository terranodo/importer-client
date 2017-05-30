export default function permissions() {
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


export const getDefaultConfig = () => {
  return {
    steps: {
      1: {
        title: 'Layer Name',
        steps: [
          { title: '', api_name: 'layer_name', type: 'text'}
        ]
      }
    }
  }
}
export const generateConfigArray = (config) => {
  let configArray = [];
  if(config.edit_name) {
    configArray.push({title: 'Layer Name', api_name: 'layerName', type: 'text'});
  }
  if(config.edit_time) {
    configArray.push({title: 'Start Date', api_name: 'start_date', type: 'fields'});
    configArray.push({title: 'End Date', api_name: 'end_date', type: 'fields'});
  }
  if(config.edit_permission) {
  }
  if(config.other.length > 0) {
    return configArray.concat(config.other);
  }
  return configArray;
}
export const generateTitleArray = (config) => {
  return config.map( (d, index) => {
    return d.title;
  });
}
export const createLayerConfigWithName = (name) => {
  return { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: name}
}
export const createLayerConfigFromConfigArray = (config, values) => {
  let defaultConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: null};
  Object.keys(config.steps).map((d, i) => {
    config.steps[d].steps.forEach( (d) => {
      defaultConfig[d.api_name] = values[d.api_name];
    });
  });
  return defaultConfig;
}

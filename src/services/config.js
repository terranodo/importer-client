import configDefaults from '../config/defaults'

let getClass = {}.toString,
    hasProperty = {}.hasOwnProperty;
function isFunction(object) {
 return object && getClass.call(object) == '[object Function]';
}
export const getDefaultConfig = () => {
  return ["layerName"];
}
export const convertConfigToSteps = (config, layer, options = {}) => {
  let steps = [];
  config.forEach((c) => {
    let step;
    if(configDefaults[c]) {
      step = configDefaults[c]();
    }else {
      step = c();
    }
    step(layer, options);
    steps.push(step);
  })
  return steps;
}
export const importLayerConfig = (config, values) => {
  let minimalConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layerName: ''}
  config.forEach((value) => {
    minimalConfig = Object.assign(minimalConfig, value.convert(values))
  });
  return minimalConfig;
}
export const createLayerConfigWithName = (name) => {
  return { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: name}
}
export const createLayerConfigFromConfigArray = (config, values) => {
  let defaultConfig = { index: 0, permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}, configureTime: false, convert_to_date: [], editable: true, start_date: null, end_date: null, layer_name: null};
  Object.keys(config.steps).map((d, i) => {
    config.steps[d].fields.forEach( (d) => {
      if(!(typeof values[d.api_name] === 'undefined' || values[d.api_name] === null )) {
        defaultConfig[d.api_name] = values[d.api_name];
      }
      if(d.type === 'hidden' && (!d.parent || (d.parent && values[d.parent]))) {
        if(isFunction(d.value)) {
          defaultConfig[d.api_name] = d.value(values);
        } else {
          defaultConfig[d.api_name] = d.value;
        }
      }
    });
  });
  return defaultConfig;
}

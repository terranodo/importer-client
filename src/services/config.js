import configDefaults from '../config/defaults'

export const getDefaultConfig = () => {
  return ["layerName"];
}
export const convertConfigToSteps = (config, layer, options = {}) => {
  let steps = [];
  config.forEach((c) => {
    let stepObj;
    if(configDefaults[c]) {
      stepObj = configDefaults[c]();
    }else {
      stepObj = c();
    }
    stepObj(layer, options);
    steps.push(stepObj);
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

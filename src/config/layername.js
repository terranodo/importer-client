var layerName = function() {
  var layer, options,valuePromise,
  title = 'Layer Name';
  var steps = function(layer, options) {
    valuePromise = Promise.resolve(layer.layerName);
  };
  steps.fields = function() {
    return [{
      name: 'layerName',
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
export default layerName;

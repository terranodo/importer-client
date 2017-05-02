var layerName = function() {
  var title = 'Layer Name';
  var steps = function() {
  }
  steps.fields = function() {
    return [{
      name: 'layerName',
      type: 'text'
    }]
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

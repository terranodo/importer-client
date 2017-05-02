var geogig = function() {
  var title = 'History';
  var steps = function() {
  }
  steps.fields = function() {
    return [{
      name: 'geogig',
      type: 'switch'
    }]
  }
  steps.convert = function(values) {
    if(values.geogig) {
      return {editable: true, geoserver_store: 'geogig' };
    }
    return {};
  }
  steps.valid = function(values) {
    return values;
  }
  return steps;
}
export default geogig;

export default function dateTime() {
  var layer, options, valuePromise,
  title = 'Time';
  var steps = function(layer, options) {
    valuePromise = Promise.resolve(Object.keys(layer));
  }
  steps.fields = function() {
    return [{
      name: 'start_date',
      type: 'select',
      values: valuePromise
    }]
  }
  steps.convert = function(values) {
    if(values.start_date) {
      let convertToDate = [values.start_date];
      if(values.end_date) { convertToDate.push(values.end_date)};
      return Object.assign({}, values, {configureTime: true, convert_to_date: convertToDate});
    }
    return {};
  }
  steps.valid = function(values) {
    return values;
  }
  return steps;
}

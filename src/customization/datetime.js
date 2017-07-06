export default function dateTime() {
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

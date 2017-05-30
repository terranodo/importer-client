import dateTime from '../../src/customization/datetime';

describe('functional customization', () => {
  let layer, option;
  beforeEach(() => {
    layer = {};
    option = {};
  });
  describe('dateTime', () => {
    let step;
    beforeEach(() => {
      step = dateTime();
      step(layer, option);
    });
    describe('#fields', () => {
      beforeEach(() => {
        layer = {layerName: 'T'};
        step(layer, option);
      });
      it('returns fields with a value promise', () => {
        let result = [{name: 'start_date', type: 'select', values: Promise.resolve(['layerName']), subtitle: 'Start Date'}, {name: 'end_date', type: 'select', values: Promise.resolve(['layerName']), subtitle: 'End Date'}];
        expect(step.fields()).to.deep.equal(result);
      });
      it('returns fields with the default value for start_date', () => {
        let fields = step.fields();
        expect(fields[0].values).to.eventually.deep.equal(['layerName']);
      });
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let values = {"start_date": "field1"};
        let result = {start_date: "field1", configureTime: true, convert_to_date: ["field1"]};
        expect(step.convert(values)).to.deep.equal(result);
      });
    });
  });
});

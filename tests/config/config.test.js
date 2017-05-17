import dateTime from '../../src/config/datetime';
import layerName from '../../src/config/layername';
import geogig from '../../src/config/geogig';

describe('functional config', () => {
  let layer, option;
  beforeEach(() => {
    layer = {};
    option = {};
  });
  describe('layerName', () => {
    let step;
    beforeEach(() => {
      step = layerName();
      layer = { layerName: 'Test'};
      step(layer, option);
    });
    describe('#fields', () => {
      it('field value is a promise which results in layerName', () => {
        let fields = step.fields();
        expect(fields[0].value).to.eventually.equal('Test');
      });
      it('returns fields with a value promise', () => {
        let result = [{name: 'layerName', type: 'text', value: Promise.resolve('Test')}];
        expect(step.fields()).to.deep.equal(result);
      });
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let result = {"layerName": "testName"};
        expect(step.convert(result)).to.deep.equal(result);
      });
    });
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
  describe('geogig', () => {
    let step;
    beforeEach(() => {
      step = geogig();
      step(layer, option);
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let values = { "geogig": true };
        let result = {editable: true, geoserver_store: 'geogig'};
        expect(step.convert(values)).to.deep.equal(result);
      });
    });
  });
});

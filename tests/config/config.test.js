import dateTime from '../../src/datetime';
import layerName from '../../src/layername';
import geogig from '../../src/geogig';

describe('functional config', () => {
  describe('layerName', () => {
    let step;
    beforeEach(() => {
      step = layerName();
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let result = {"layerName": "testName"};
        assert.deepEqual(step.convert(result), result);
      });
    });
  });
  describe('dateTime', () => {
    let step;
    beforeEach(() => {
      step = dateTime();
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let values = {"start_date": "field1"};
        let result = {start_date: "field1", configureTime: true, convert_to_date: ["field1"]};
        assert.deepEqual(step.convert(values), result);
      });
    });
  });
  describe('geogig', () => {
    let step;
    beforeEach(() => {
      step = geogig();
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let values = { "geogig": true };
        let result = {editable: true, geoserver_store: 'geogig'};
        assert.deepEqual(step.convert(values), result);
      });
    });
  });
});

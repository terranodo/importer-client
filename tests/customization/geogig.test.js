import geogig from '../../src/customization/geogig';

describe('functional customization', () => {
  let layer, option;
  beforeEach(() => {
    layer = {};
    option = {};
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
    describe('#fields', () => {
      beforeEach(() => {
        layer = {layerName: 'T'};
        step(layer, option);
      });
      it('returns fields', () => {
        let result = [{name: 'geogig', type: 'switch'}];
        expect(step.fields()).to.deep.equal(result);
      });
    });
  });
});

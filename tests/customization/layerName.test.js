import layerName from '../../src/customization/layername';

describe('functional customization', () => {
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
});

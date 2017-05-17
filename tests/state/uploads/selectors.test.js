import {uploadSuccess, uploadData, getUploadData, uploadId, isLayerImported, singleImportStarted} from '../../../src/state/uploads/selectors'

describe('#uploadSuccess', () => {
  describe('status is success', () => {
    it('returns true', () => {
      expect(uploadSuccess({uploads: { status: "UPLOADED"}})).to.equal(true);
    });
  });
  describe('status is not set', () => {
    it('returns false', () => {
      expect(uploadSuccess({uploads: {status: undefined}})).to.equal(false);
    });
  });
})
describe('#uploadData', () => {
  describe('data is set', () => {
    it('returns true', () => {
      expect(uploadData({uploads: { data: [ {} ]}})).to.equal(true);
    });
  });
  describe('data is undefined', () => {
    it('returns false', () => {
      expect(uploadData({uploads: { data: undefined}})).to.equal(false);
    });
  });
})
describe('#getUploadData', () => {
  it('returns data', () => {
    expect(getUploadData({uploads: { data: [{id: 1}]}})).to.deep.equal([{id: 1}]);
  });
});
describe('#uploadId', () => {
  it('returns id', () => {
    expect(uploadId({uploads: {id: 1}})).to.equal(1);
  });
});
describe('#isLayerImported', () => {
  describe('was successful', () => {
    it('returns true', () => {
      expect(isLayerImported({uploads: { importLayers: { single: { 1: { success: true}}}}},1)).to.equal(true);
    });
  })
  describe('not successful', () => {
    it('returns false', () => {
      expect(isLayerImported({uploads: { importLayers: { single: { }}}},1)).to.equal(false);
    });
  })
});
describe('#singleImportStarted', () => {
  describe('is import started', () => {
    it('returns true', () => {
      expect(singleImportStarted({uploads: { importLayers: { single: { 1: { started: true}}}}},1)).to.equal(true);
    });
  })
  describe('import not started', () => {
    it('returns false', () => {
      expect(singleImportStarted({uploads: { importLayers: { single: { }}}},1)).to.equal(false);
    });
  })
});

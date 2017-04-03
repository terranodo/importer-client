import {uploadSuccess, uploadData, getUploadData, uploadId, isLayerImported, singleImportStarted, isCurrentlyImporting} from '../../../src/state/uploads/selectors'

describe('#uploadSuccess', () => {
  describe('status is success', () => {
    it('returns true', () => {
      assert.equal(uploadSuccess({uploads: { status: "UPLOADED"}}), true);
    });
  });
  describe('status is not set', () => {
    it('returns false', () => {
      assert.equal(uploadSuccess({uploads: {status: undefined}}), false);
    });
  });
})
describe('#uploadData', () => {
  describe('data is set', () => {
    it('returns true', () => {
      assert.equal(uploadData({uploads: { data: [ {} ]}}), true);
    });
  });
  describe('data is undefined', () => {
    it('returns false', () => {
      assert.equal(uploadData({uploads: { data: undefined}}), false);
    });
  });
})
describe('#getUploadData', () => {
  it('returns data', () => {
    assert.deepEqual(getUploadData({uploads: { data: [{id: 1}]}}), [{id: 1}]);
  });
});
describe('#uploadId', () => {
  it('returns id', () => {
    assert.equal(uploadId({uploads: {id: 1}}), 1);
  });
});
describe('#isLayerImported', () => {
  describe('was successful', () => {
    it('returns true', () => {
      assert.equal(isLayerImported({uploads: { importLayers: { single: { 1: { success: true}}}}},1), true);
    });
  })
  describe('not successful', () => {
    it('returns false', () => {
      assert.equal(isLayerImported({uploads: { importLayers: { single: { }}}},1),false);
    });
  })
});
describe('#singleImportStarted', () => {
  describe('is import started', () => {
    it('returns true', () => {
      assert.equal(singleImportStarted({uploads: { importLayers: { single: { 1: { started: true}}}}},1), true);
    });
  })
  describe('import not started', () => {
    it('returns false', () => {
      assert.equal(singleImportStarted({uploads: { importLayers: { single: { }}}},1),false);
    });
  })
});
describe('#isCurrentlyImporting', () => {
  describe('import not complete', () => {
    it('returns true', () => {
      let layers = [{import_status: "PENDING"}, {import_status: null}];
      assert.equal(isCurrentlyImporting({uploads: { data: { layers: layers }}}),true);
    });
  });
  describe('import complete', () => {
    it('returns false', () => {
      let layers = [{import_status: "SUCCESS"}, {import_status: "FAILED"}];
      assert.equal(isCurrentlyImporting({uploads: { data: { layers: layers }}}),false);
    });
  });
});

import {uploadSuccess, uploadData, getUploadData, uploadId} from '../../../src/state/uploads/selectors'

describe('#uploadSuccess', () => {
  describe('status is success', () => {
    it('returns true', () => {
      assert.equal(uploadSuccess({uploads: { status: "success"}}), true);
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
  describe('data is empty', () => {
    it('returns false', () => {
      assert.equal(uploadData({uploads: { data: []}}), false);
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

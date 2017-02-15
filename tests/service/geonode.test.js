import fetchMock from 'fetch-mock';

import {uploadFiles} from '../../src/services/geonode';

describe('uploadFile', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  describe('', () => {
    let server = 'http://52.37.73.154/';
    describe('success', () => {
      beforeEach(() => {
        fetchMock
        .post('http://52.37.73.154/uploads/new/json', {result: ''});
      });
      afterEach(() => {
        fetchMock.restore();
      });
      it('returns result', () => {
        return assert.becomes(uploadFiles(server,[]), {result: ''});
      });
    });
	});
});

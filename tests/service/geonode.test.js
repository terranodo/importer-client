import fetchMock from 'fetch-mock';

import {uploadFiles, configure, importAll, allUploadedData, uploadedData, getUsers, genericPost} from '../../src/services/geonode';

describe('uploadFile', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  describe('', () => {
    let server = 'http://52.37.73.154';
    describe('success', () => {
      beforeEach(() => {
        fetchMock
        .post('http://52.37.73.154/uploads/new/json', {state: '', id: 1, count: 1});
      });
      afterEach(() => {
        fetchMock.restore();
      });
      it('returns result', () => {
        return assert.becomes(uploadFiles(server,[]), {state: '', id: 1, count: 1});
      });
    });
	});
});
describe('configure', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  let server = 'http://52.37.73.154';
  let id = 1;
  describe('success', () => {
    beforeEach(() => {
      fetchMock
      .post(`http://52.37.73.154/importer-api/data-layers/${id}/configure/`, {});
    });
    afterEach(() => {
      fetchMock.restore();
    });
    it('returns result', () => {
      return assert.becomes(configure(server,id,{}), {});
    });
  });
});
describe('#importAll', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  let server = 'http://52.37.73.154';
  let id = 1;
  describe('success', () => {
    beforeEach(() => {
      fetchMock
      .get(`http://52.37.73.154/importer-api/data/${id}/import_all_layers/`, {layers: 3});
    });
    afterEach(() => {
      fetchMock.restore();
    });
    it('returns result', () => {
      return assert.becomes(importAll(server,id), { layers: 3});
    });
  });
});
describe('#allUploadedData', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  let server = 'http://52.37.73.154';
  let data = {
    complete: true,
    id: 2,
    layers: [],
    state: 'UPLOADED',
    resource_uri: '/importer-api/data/2'
  };
  let result = { meta: {}, objects: [data]};
  describe('success', () => {
    beforeEach(() => {
      fetchMock
      .get('http://52.37.73.154/importer-api/data/', result);
    });
    afterEach(() => {
      fetchMock.restore();
    });
    it('returns result', () => {
      return assert.becomes(allUploadedData(server), result);
    });
  });
});
describe('#uploadedData', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  let server = 'http://52.37.73.154';
  let id = 2;
  let data = {
    complete: true,
    id: 2,
    layers: [],
    state: 'UPLOADED',
    resource_uri: '/importer-api/data/2'
  };
  describe('success', () => {
    beforeEach(() => {
      fetchMock
      .get('http://52.37.73.154/importer-api/data/2/', data);
    });
    afterEach(() => {
      fetchMock.restore();
    });
    it('returns result', () => {
      return assert.becomes(uploadedData(server, id), data);
    });
  });
});
describe('#genericPost', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  let server = 'http://52.37.73.154';
  let data = {
    query: 'username'
  };
  let result = {
    count: 1,
    users: [
      { username: "admin" }
    ],
    groups: []
  }
  describe('success', () => {
    beforeEach(() => {
      fetchMock
      .post('http://52.37.73.154/account/ajax_lookup', result);
    });
    afterEach(() => {
      fetchMock.restore();
    });
    it('returns user result', () => {
      return assert.becomes(genericPost(server, 'account/ajax_lookup', data), result);
    });
  });
});
describe('#getUsers', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  let server = 'http://52.37.73.154';
  let data = {
    query: 'username'
  };
  let result = {
    count: 1,
    users: [
      { username: "admin" }
    ],
    groups: []
  }
  describe('success', () => {
    beforeEach(() => {
      fetchMock
      .post('http://52.37.73.154/account/ajax_lookup', result);
    });
    afterEach(() => {
      fetchMock.restore();
    });
    it('returns user result', () => {
      return assert.becomes(getUsers(server, data), result);
    });
  });
});

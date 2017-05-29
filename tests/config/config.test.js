import dateTime from '../../src/config/datetime';
import layerName from '../../src/config/layername';
import geogig from '../../src/config/geogig';
import permissions from '../../src/config/permissions';
import fetchMock from 'fetch-mock';

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
  describe('permissions', () => {
    let step, ajaxResult;
    beforeEach(() => {
      step = permissions();
      option = { siteUrl: 'http://importer.terranodo.io'}
      ajaxResult = {count: 1, users: [{"username": "admin"}], groups: []};
      fetchMock.post('http://importer.terranodo.io/account/ajax_lookup', ajaxResult);
      step(layer, option);
    });
    afterEach( () => {
      fetchMock.restore();
    });
    describe('#convert', () => {
      it('returns the api config with values', () => {
        let values = {view_resourcebase: [], download_resourcebase: [] };
        let result = {permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase']}}}
        expect(step.convert(values)).to.deep.equal(result);
      });
      it('returns the api config with signle user admin', () => {
        let values = {view_resourcebase: ['admin'], download_resourcebase: [] };
        let result = {permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase'], admin: ['view_resourcebase']}}}
        expect(step.convert(values)).to.deep.equal(result);
      });
      it('returns the api config with multiple users ', () => {
        let values = {view_resourcebase: ['admin', 'jeff'], download_resourcebase: [] };
        let result = {permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase'], admin: ['view_resourcebase'], jeff: ['view_resourcebase']}}}
        expect(step.convert(values)).to.deep.equal(result);
      });
      it('returns the api config with multiple permissions per user', () => {
        let values = {view_resourcebase: ['admin'], 'download_resourcebase': ['admin'] };
        let result = {permissions: {'users':{'AnonymousUser':['change_layer_data', 'download_resourcebase', 'view_resourcebase'], admin: ['view_resourcebase', 'download_resourcebase']}}}
        expect(step.convert(values)).to.deep.equal(result);
      });
    });
    describe('#fields', () => {
      beforeEach(() => {
        layer = {layerName: 'T'};
        step(layer, option);
      });
      it('returns fields', () => {
        let promise = new Promise(function(resolve, reject) {});
        let result = [ { name: 'view_resourcebase', type: 'multiselect', values: promise, subtitle: 'Who can see the layer' },
          { name: 'download_resourcebase', type: 'multiselect', values: promise, subtitle: 'Who can download the layer' },
          { name: 'change_layer_data', type: 'multiselect', values: promise, subtitle: 'Who can download the layer' }
        ];
        expect(step.fields()).to.deep.equal(result);
      });
      it('return usernames for the first fields values', () => {
        let fields = step.fields();
        return expect(fields[0].values).to.eventually.deep.equal(ajaxResult.users);
      });
    });
  });
});

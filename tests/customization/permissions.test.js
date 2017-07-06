import permissions from '../../src/customization/permissions';
import fetchMock from 'fetch-mock';

describe('functional customization', () => {
  let layer, option;
  beforeEach(() => {
    layer = {};
    option = {};
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

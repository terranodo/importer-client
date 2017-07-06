import {getServerUrl} from '../../../src/state/server/selectors'

describe('#getServerUrl', () => {
  it('url for state', () => {
    expect(getServerUrl({server: { url: "test.url"}})).to.equal("test.url");
  });
})

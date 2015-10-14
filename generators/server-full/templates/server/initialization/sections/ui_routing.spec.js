const regex = require('./ui_routing').regex;
const { expect } = require('chai');

describe('UI Routing', () => {
  it('will allow calls to the root API to pass through', () => {
    expect('/api'.match(regex)).to.be.null;
    expect('/api/things'.match(regex)).to.be.null;
  });

  it('will match UI routes', () => {
    expect('/derps'.match(regex)).to.not.be.null;
    expect('/derps/herps'.match(regex)).to.not.be.null;
  });

  it('will not match filenames', () => {
    expect('/styles/style.css'.match(regex)).to.be.null;
    expect('/api.json'.match(regex)).to.be.null;
  });
});

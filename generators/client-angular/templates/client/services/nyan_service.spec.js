require('../common.spec/spec.helpers');
const index = require('./index');
const {expect} = require('chai');

describe('The Nyan Service', () => {
  let service = null;
  beforeEach(window.module(index.name));

  /**
   * Establish mock dependencies.
   */
  beforeEach(window.module(($provide) => {
    $provide.value('$window', {});
  }));

  /**
   * Instantiate the required components.
   */
  beforeEach(window.inject((_NyanService_) => {
    service = _NyanService_;
  }));

  it('can be constructed', () => {
    expect(service).to.be.ok;
  });

  it('can retrieve the nyan resource', () => {
    expect(service.getNyanSource()).to.be.a.string;
  });
});

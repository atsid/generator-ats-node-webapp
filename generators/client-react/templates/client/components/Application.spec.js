require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react/addons');
const ReactTestUtils = React.addons.TestUtils;
const Application = require('./Application');
const nock = require('nock');

describe('Application Component', () => {
  it('should load', () => {
    nock('http://localhost').get('/api/auth/current').reply(200, { 'name': 'Bob Tester'});
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Application />
    );
    expect(renderedComponent).to.exist;
  });
});

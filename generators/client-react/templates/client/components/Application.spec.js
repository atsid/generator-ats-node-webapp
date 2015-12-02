require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
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

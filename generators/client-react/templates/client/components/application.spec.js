require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react/addons');
const ReactTestUtils = React.addons.TestUtils;
const Application = require('./application');

describe('Application Component', () => {
  it('should load', () => {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Application />
    );
    expect(renderedComponent).to.exist;
  });
});

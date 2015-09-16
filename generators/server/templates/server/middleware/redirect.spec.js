const { expect } = require('chai');
const redirect = require('./redirect');

describe('Redirect Middleware', () => {
  it('can redirect a response', () => {
    const res = {
      redirect: (location) => expect(location).to.equal('www.google.com'),
    };
    redirect('www.google.com')({}, res);
  });
});

const {expect} = require('chai');
const parser = require('./parse_iso_8601_date');

describe('The ISO-8601 Date Parser', () => {
  it('can turn an ISO-9601 string into a Date object', () => {
    let date = parser('2015-06-25');
    expect(typeof date).to.equal('object');
    expect(date.getTime()).to.equal(1435190400000);

    date = parser('2015-02-20T17:44:44.831Z');
    expect(typeof date).to.equal('object');
    expect(date.getTime()).to.equal(1424454284831);
  });

  it('leaves non-date strings unchanged', () => {
    expect(parser('abc')).to.equal('abc');
  });
});

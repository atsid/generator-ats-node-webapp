const {expect} = require('chai');

describe('The main driver', () => {
    it('starts up a web server', () => {
        require('./main').then((result) => expect(result).to.be.an.object);
    });
});

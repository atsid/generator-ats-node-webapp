const {expect} = require('chai');
const send = require('./send');

describe('debug.send middleware', () => {
    it('can send debug messages', (done) => {
        const callback = send('derp');
        let sentJson = false;
        const res = {
            json: (data) => {
                sentJson = true;
                expect(data.message).to.equal('derp');
            },
            end: () => {
                expect(sentJson).to.be.true;
                done();
            },
        };
        callback({}, res);
    });
});

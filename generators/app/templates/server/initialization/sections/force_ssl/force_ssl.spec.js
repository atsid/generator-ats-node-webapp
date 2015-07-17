const {expect} = require('chai');
const forceSsl = require('./force_ssl');

describe('The ForceSSL Handler', () => {
    it('does nothing if no headers are set', (done) => {
        const req = {headers: {}};
        const res = {
            redirect: () => {
                throw new Error('Did not expect redirect');
            },
        };
        const next = () => done();
        forceSsl(req, res, next);
    });

    it('adds https if x-forwarded-proto header is present', (done) => {
        const req = {
            url: '',
            headers: {
                'x-forwarded-proto': 'http',
                host: 'localhost:9000',
            },
        };
        const res = {
            redirect: (url) => {
                expect(url.indexOf('https')).to.equal(0);
                done();
            },
        };
        const next = () => {
            throw new Error('did not expect next to be called');
        };
        forceSsl(req, res, next);
    });
});

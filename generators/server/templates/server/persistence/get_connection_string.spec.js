const { expect } = require('chai');
const getConnectionString = require('./get_connection_string');

describe('The getConnectionString function', () => {
    it('will return a connection string embedded in the config object', () => {
        const string = getConnectionString({container: {composed: false}, database: {connectionString: 'abc'}});
        expect(string).to.equal('abc');
    });

    it('can construct a connection-string in docker-compose', () => {
        const string = getConnectionString({
            container: {composed: 1},
            database: {
                composeConnection: {
                    host: 'localhost',
                    port: '1000',
                    dbName: 'badger',
                },
            },
        });
        expect(string).to.equal('mongodb://localhost:1000/badger');
    });
});

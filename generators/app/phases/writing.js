const path = require('path');
const Writer = require('../../../util/writer');
const writer = new Writer();

module.exports = {
    files() {
        console.log("Properties", this.props);
        writer.process(path.join(__dirname, "../templates"), "", this);
    },
    client() {
    }
};

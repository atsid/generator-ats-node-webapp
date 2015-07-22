const path = require('path');
const Writer = require('../../writer');
const writer = new Writer();

module.exports = (generatorPath) => {
    return {
        writeTemplates(){
            writer.process(path.join(generatorPath, "/templates"), "", this);
        }
    };
};

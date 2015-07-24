const fs = require('fs');
const path = require('path');
const Writer = require('../../writer');
const writer = new Writer();

module.exports = (generatorPath) => {
    return {
        writeTemplates(){
            const templatePath = path.join(generatorPath, "/templates");
            if (fs.existsSync(templatePath)) {
                writer.process(templatePath, "", this);
            }
        }
    };
};

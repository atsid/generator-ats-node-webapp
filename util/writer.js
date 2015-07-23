const fs = require("fs");
const path = require("path");
const DOT_FILES = {
    "editorconfig": true,
    "eslintrc": true,
    "gitignore": true,
    "gitattributes": true
};

/**
 * Recursively processes content in a directory.
 * Files ending with '.tpl' will be processed as templates using 'this.props' as the template context.
 *
 * @param dir The absolute directory to process
 * @param templatePath The relative template path
 * @param context The yeoman context
 */
class PathScanner {
    process(dir, templateDir, context) {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);
            const templatePath = path.join(templateDir, file);
            const isDirectory = fs.lstatSync(filePath).isDirectory();

            if (isDirectory) {
                this.process(filePath, templatePath, context);
            } else {
                const isTemplate = file.indexOf(".tpl") > -1;
                const targetFilename = path.join(templateDir, (DOT_FILES[file] ? "." : "") + file).replace(".tpl", "");
                const method = (isTemplate  ? 'copyTpl' : 'copy');

                console.log("processing", templatePath);
                context.fs[method](
                    context.templatePath(templatePath),
                    context.destinationPath(targetFilename),
                    context.props);
            }
        });
    }
}

module.exports = PathScanner;

const fs = require('fs');
const path = require('path');
const debug = require('debug')('generator-ats-node-webapp:writer');
const DOT_FILES = {
  'editorconfig': true,
  'eslintrc': true,
  'gitignore': true,
  'gitattributes': true,
  'nodemonignore': true,
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
  constructor() {
    this.process = this.process.bind(this);
  }

  process(dir, templateDir, context) {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      const templatePath = path.join(templateDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        debug('processing dir', filePath);
        this.process(filePath, templatePath, context);
      } else {
        debug('processing file', filePath);
        const isTemplate = file.indexOf('.tpl') > -1;
        const targetFilename = path.join(templateDir, (DOT_FILES[file] ? '.' : '') + file).replace('.tpl', '');
        const method = (isTemplate ? 'copyTpl' : 'copy');

        try {
          context.fs[method](
            context.templatePath(templatePath),
            context.destinationPath(targetFilename),
            context.props);
        } catch (err) {
          debug('Error processing template using ' + method + ':', templatePath);
          throw err;
        }
      }
    });
  }
}

module.exports = PathScanner;

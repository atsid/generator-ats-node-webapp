var fs = require("fs");
var path = require("path");

var DOT_FILES = {
  "editorconfig": true,
  "eslintrc": true,
  "gitignore": true
};

/**
 * Recursively processes content in a directory.
 * Files ending with '.tpl' will be processed as templates using 'this.props' as the template context.
 *
 * @param dir The absolute directory to process
 * @param templatePath The relative template path
 * @param context The yeoman context
 */
function scanPath(dir, templatePath, context) {
  fs.readdirSync(dir).forEach(function (file) {
    if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
      scanPath(path.join(dir, file), path.join(templatePath, file), context);
    } else {
      var targetFilename = path.join(templatePath, (DOT_FILES[file] ? "." : "") + file).replace(".tpl", "");
      if(file.indexOf(".tpl") > -1) {
        context.fs.copyTpl(
          context.templatePath(path.join(templatePath, file)),
          context.destinationPath(targetFilename),
          context.props);
      } else {
        context.fs.copy(
          context.templatePath(path.join(templatePath, file)),
          context.destinationPath(targetFilename),
          context.props);
      }
    }
  });
}

module.exports = {
  files: function () {
    scanPath(path.join(__dirname, "../templates"), "", this);
  }
};
